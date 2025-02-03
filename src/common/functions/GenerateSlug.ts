import slugify from "slugify";

const generateSlug = (slug) => slugify(slug, {
    lower: true,
    strict: true,
    locale: 'vi',
})

export default generateSlug