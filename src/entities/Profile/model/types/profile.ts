import { Theme } from "../../../../app/theme";

export interface ProfileSchema {
    id: number,
    email: string,
    name: string,
    theme?: Theme
}