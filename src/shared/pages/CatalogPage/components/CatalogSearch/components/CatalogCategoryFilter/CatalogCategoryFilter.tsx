'use client';
import { MultiDropdown } from '@components';
import { useProductCategories } from '@hooks/categories/useProductCategories';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import styles from './CatalogCategoryFilter.module.scss'

export type Option = {
    key: string;
    value: string;
};

export const CatalogCategoryFilter = () => {
    const [pendingCategories, setPendingCategories] = useState<Option[] | null>(null);
    const { data } = useProductCategories();
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryMap = useMemo(() => {
        if (!data?.items) return new Map<number, string>();
        return new Map(data.items.map((c) => [c.id, c.title]));
    }, [data]);

    const categoryOptions = useMemo(() => {
        return Array.from(categoryMap.entries()).map(([id, title]) => ({
            key: String(id),
            value: title,
        }));
    }, [categoryMap]);

    const selectedCategories = useMemo(() => {
        const categoriesParam = searchParams.get("categories");
        const selectedIds = categoriesParam ? categoriesParam.split(",") : [];
        const result: Option[] = [];

        selectedIds.forEach((id) => {
            const title = categoryMap.get(Number(id));
            if (title) result.push({ key: id, value: title });
        });

        return result;
    }, [searchParams, categoryMap]);

    const displayedCategories = pendingCategories ?? selectedCategories;

    const getCategoriesTitle = (selected: Option[]): string => {
        if (selected.length === 0) return 'All categories';
        if (selected.length === 1) return selected[0].value;
        return `Selected: ${selected.length}`;
    };

    const handleCategoriesChange = (selected: Option[]) => {
        setPendingCategories(selected);
    };

    const handleCategoriesClose = () => {
        if (pendingCategories === null) return;

        const params = new URLSearchParams(searchParams.toString());

        if (!pendingCategories.length) {
            params.delete("categories");
        } else {
            params.set("categories", pendingCategories.map((o) => o.key).join(","));
        }

        params.delete("page");
        router.push(`?${params.toString()}`, { scroll: false });
        setPendingCategories(null);
    };

    return (
        <div className={styles.categories}>
        <MultiDropdown
            options={categoryOptions}
            value={displayedCategories}
            onChange={handleCategoriesChange}
            getTitle={getCategoriesTitle}
            placeholder="Выберите категории"
            onClose={handleCategoriesClose}
        />
        </div>
    );
};

export default CatalogCategoryFilter;