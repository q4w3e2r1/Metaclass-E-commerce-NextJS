'use client';
import { useEffect, useMemo, useState } from 'react'
import { Button, Input, MultiDropdown } from '@components'
import styles from './CatalogSerach.module.scss'
import { useProductCategories } from '@hooks/categories/useProductCategories';
import { useSearchParams, useRouter } from 'next/navigation';

export type Option = {
    key: string;
    value: string;
  };
  
export const CatalogSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const [pendingCategories, setPendingCategories] = useState<Option[] | null>(null);


    const { data, isLoading } = useProductCategories();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setSearchValue(searchParams.get("search") ?? "");
      }, [searchParams]);

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

    const categoriesParam = searchParams.get("categories");
    const selectedIds = useMemo(() => {
        return categoriesParam ? categoriesParam.split(",") : [];
    }, [categoriesParam]);

    const selectedCategories = useMemo(() => {
        const result: Option[] = [];
        
        selectedIds.forEach((id) => {
          const title = categoryMap.get(Number(id));
          if (title) {
            result.push({ key: id, value: title });
          }
        });
        
        return result;
      }, [selectedIds, categoryMap]);

    const displayedCategories = pendingCategories ?? selectedCategories;

    const getCategoriesTitle = (selected: Option[]): string => {
        if (selected.length === 0) {
            return 'Все категории'
        }
        if (selected.length === 1) {
            return selected[0].value
        }
        return `Выбрано: ${selected.length}`
    }

    const handleSearchChange = (value: string) => {
        setSearchValue(value)
    }

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
        router.push(`?${params.toString()}`);
        setPendingCategories(null);
    };

    const handleSearchSubmit = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (!searchValue.trim()) {
            params.delete("search");
        } else {
            params.set("search", searchValue.trim());
        }
        
        params.delete("page");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <Input 
                    value={searchValue}
                    placeholder='Search product' 
                    onChange={handleSearchChange}
                />
                <Button onClick={handleSearchSubmit}>Find now</Button>
            </div>
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
        </div>
    )
}

export default CatalogSearch