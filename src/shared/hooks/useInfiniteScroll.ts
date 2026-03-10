'use client'
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

interface UseInfiniteScrollProps {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  totalPages?: number;
}

interface UseInfiniteScrollReturn {
  loaderRef: React.RefObject<HTMLDivElement | null>;
  observePage: (pageNumber: number) => (el: HTMLDivElement | null) => void;
  isRestoring: boolean;
  targetPageFromUrl: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  totalPages = 0,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const pageObserverRef = useRef<IntersectionObserver | null>(null);
  const lastPageRef = useRef(1);
  const initialRestoreDoneRef = useRef(false);
  const isFirstRestoreAttempted = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [searchParams] = [useSearchParams()];
  const isRestoringRef = useRef(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const setSearchParams = useCallback(
    (params: URLSearchParams) => {
      window.history.replaceState(null, '', `?${params.toString()}`);
    },
    []
  );

  const targetPageFromUrl = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const raw = Number(new URLSearchParams(window.location.search).get("page"));
    return raw && raw > 1 ? raw : 1;
  }, [searchParams, mounted]);

  useEffect(() => {
    isFirstRestoreAttempted.current = false;
    initialRestoreDoneRef.current = false;
    lastPageRef.current = 1;
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isRestoring) {
          fetchNextPage?.();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isRestoring]);

  // Восстановление скролла после перезагрузки страницы
  useEffect(() => {
    if (targetPageFromUrl <= 1) return;
    if (targetPageFromUrl > totalPages) {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage?.();
      return;
    }
    if (isFirstRestoreAttempted.current) return;

    const el = pageRefs.current.get(targetPageFromUrl);
    if (!el) return;

    isFirstRestoreAttempted.current = true;
    isRestoringRef.current = true;
    setIsRestoring(true);

    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'auto' });

    const completeRestoration = () => {
      lastPageRef.current = targetPageFromUrl;
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("page", String(targetPageFromUrl));
      setSearchParams(currentParams);
      setIsRestoring(false);
      isRestoringRef.current = false;
      initialRestoreDoneRef.current = true;
    };

    requestAnimationFrame(() => requestAnimationFrame(completeRestoration));
  }, [targetPageFromUrl, totalPages]);

  const updateUrlPage = useCallback(
    (page: number) => {
      if (lastPageRef.current === page) return;
      lastPageRef.current = page;
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("page", String(page));
      setSearchParams(currentParams);
    },
    [setSearchParams]
  );

  const observePage = useCallback(
    (pageNumber: number) => (el: HTMLDivElement | null) => {
      if (!el) {
        pageRefs.current.delete(pageNumber);
        return;
      }
      pageRefs.current.set(pageNumber, el);

      if (!pageObserverRef.current) {
        pageObserverRef.current = new IntersectionObserver(
          (entries) => {
            if (isRestoringRef.current) return;
            let bestPage = null;
            let minAbsTop = Infinity;

            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              const top = entry.boundingClientRect.top;
              if (top <= 120) {
                const absTop = Math.abs(top);
                if (absTop < minAbsTop) {
                  minAbsTop = absTop;
                  bestPage = Number(entry.target.getAttribute("data-page"));
                }
              }
            }
            if (bestPage !== null) updateUrlPage(bestPage);
          },
          { threshold: 0 }
        );
      }
      pageObserverRef.current.observe(el);
    },
    [updateUrlPage]
  );

  useEffect(() => {
    if (targetPageFromUrl > 1 && !initialRestoreDoneRef.current) {
      const params = new URLSearchParams(window.location.search);
      const currentPageInUrl = params.get("page");
      if (currentPageInUrl !== String(targetPageFromUrl)) {
        params.set("page", String(targetPageFromUrl));
        setSearchParams(params);
      }
    }
  }, [targetPageFromUrl, setSearchParams]);

  useEffect(() => {
    return () => pageObserverRef.current?.disconnect();
  }, []);

  return { loaderRef, observePage, isRestoring, targetPageFromUrl };
};