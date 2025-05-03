
class ThemeSwitcher {
    selectors = {
        switchThemeButton: '[data-js-theme-switcher]',
        switchIcon: '[data-js-theme-icon]',
        switchIconDark: '[data-js-theme-icon-dark]',
    }
    themes = {
        dark: 'dark',
        light: 'light',
    }

    stateClasses = {
        isDarkTheme: 'is-dark-theme',
        isActive: 'is-active',
    }

    storageKey = 'theme'

    constructor() {
        this.switchThemeButtonElement = document.querySelector(this.selectors.switchThemeButton)
        this.themeImage = document.querySelector(this.selectors.switchIcon)
        this.themeImageDark = document.querySelector(this.selectors.switchIconDark)
        this.setInitialTheme()
        this.bindEvents()
    }

    get isDarkThemeCached() {
        return localStorage.getItem(this.storageKey) === this.themes.dark

    }

    setInitialTheme() {
        const isDarkThemeCached = this.isDarkThemeCached

        document.documentElement.classList.toggle(
            this.stateClasses.isDarkTheme, isDarkThemeCached
        )
        this.updateThemeIcon()
    }

    onClick = () => {
        const isDarkThemeCached = this.isDarkThemeCached

        isDarkThemeCached
        localStorage.setItem(
            this.storageKey,
            isDarkThemeCached ? this.themes.light : this.themes.dark
        )
        document.documentElement.classList.toggle(
            this.stateClasses.isDarkTheme
        )
        this.updateThemeIcon()
    }

    updateThemeIcon() {
        if (document.documentElement.classList.contains(this.stateClasses.isDarkTheme)) {
            this.themeImageDark.classList.add(this.stateClasses.isActive) // Картинка для тёмной темы
            this.themeImage.classList.remove(this.stateClasses.isActive) // Картинка для тёмной темы

        } else {
            this.themeImage.classList.add(this.stateClasses.isActive)
            this.themeImageDark.classList.remove(this.stateClasses.isActive)  // Картинка для светлой темы
        }
    }

    bindEvents() {
        this.switchThemeButtonElement.addEventListener('click', this.onClick)
    }
}

export default ThemeSwitcher