import ImageColors from "react-native-image-colors";

export const getImageColors = async (uri: string) => {
    let primary;
    let secondary;
    const config = {};
    const colors = await ImageColors.getColors(uri, config);
    if (colors.platform === 'android') {
        // Access android properties
        // e.g.
        primary = colors.dominant;
        secondary = colors.average;
    } else {
        // Access iOS properties
        // e.g.
        primary = colors.primary;
        secondary = colors.secondary;
    }

    return [primary, secondary];
}