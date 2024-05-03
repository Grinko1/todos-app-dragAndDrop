import { Theme } from "../../../../app/theme";

export interface ProfileSchema {
    profile: Profile,
    isLoading: boolean,
    error: string | null | undefined

}
export interface Profile {
    id: number,
    email: string,
    name: string,

}