export type TThemeType = "light" | "dark"

export interface IThemeStoreProps {
    theme: TThemeType
    toggleTheme: () => void
    setTheme: (theme: TThemeType) => void
}

