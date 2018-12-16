/**
 * safely access a nested property
 * @param  {Object} obj Input Object
 * @param  {String} propPath property path
 * @return {Object} Nested property or null
 */
function getNestedProperty(obj, propPath) {
    if (!(typeof propPath === 'string')) {
        console.error("propPath should be a string");
        return;
    }
    const [firstPath, ...restPath] = propPath.split('.');
    if (restPath.length > 0) {
        return obj[firstPath] ? getNestedProperty(obj[firstPath], restPath.join('.')) : null;
    }
    return obj[firstPath];
}

export default getNestedProperty;