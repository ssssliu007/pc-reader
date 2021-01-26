import home from '~/views/home.svelte'
import contents from '~/views/contents.svelte'
import detail from '~/views/detail.svelte'

const routes = {
    // Exact path
    '/home/:tab?': home,
    '/detail/:id': detail,
    '/contents/:id': contents,

    // Using named parameters, with last being optional
    // '/author/:first/:last?': Author,

    // Wildcard parameter
    // '/book/*': Book,

    // Catch-all
    // This is optional, but if present it must be the last
    // '*': NotFound,
    // '*': home
}

export default routes
