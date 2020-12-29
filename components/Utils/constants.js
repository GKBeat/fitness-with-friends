const fontSizes = {
    small: 16,
    medium: 18,
    large: 20
}

const iconSizes = {
    mini: 12,
    small: 20,
    medium: 24,
    large: 28,
}

const ColorThemeBlackRoast = {
    BACKGROUND_COLOR: '#eee5e9',
    FONT_COLOR: '#000000',
    TAB_BAR_BACKGROUND_COLOR: '#000000',
    TAB_BAR_ACTIVE_COLOR: '#cf5c36',
    TAB_BAR_INACTIVE_COLOR: '#eee5e9'
};

const ColorThemeBlueSunrise = {
    BACKGROUND_COLOR: '#decdc3',
    FONT_COLOR: '#1b1b2f',
    TAB_BAR_BACKGROUND_COLOR: '#2d4059',
    TAB_BAR_ACTIVE_COLOR: '#ea5455',
    TAB_BAR_INACTIVE_COLOR: '#decdc3'
};

const themeArray = [ColorThemeBlackRoast, ColorThemeBlueSunrise];

const LoggedInUserID = '5fe4dc661c914a00172146f6';
let Color = themeArray[1];

export {
    Color,
    LoggedInUserID,
    themeArray,
    fontSizes,
    iconSizes
}