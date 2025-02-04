const convertToSlug = (name) => {
    if (typeof name !== 'string') {
        name = String(name);
    }
    
    let slug = name.toLowerCase();
    
    slug = slug.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    
    slug = slug.replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    
    slug = slug.replace(/^-+|-+$/g, '');
    
    return slug;
}
export default convertToSlug