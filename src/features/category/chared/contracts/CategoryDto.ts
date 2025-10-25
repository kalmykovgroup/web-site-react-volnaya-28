import type {Guid} from "@app/lib/types/Guid.ts";
import type {CategoryImage} from "@category/chared/contracts/CategoryImage.ts";

export interface CategoryDto {
    id: Guid;
    iconUrl: string;
    iconAlt: string;
    backgroundUrl: string;
    backgroundAlt: string;
    name: string;
    description: string;
    color: string;
    order: number;
    images: CategoryImage[];
}