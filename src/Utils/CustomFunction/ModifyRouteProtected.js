const modifyRouteProtected = (path, protectedRoutes) => {
    if(protectedRoutes.some(route => "/admin/".startsWith(route))) {
        return path.replace("/admin/", "")
    }
    if(protectedRoutes.some(route => '/profile'.startsWith(route))) {
        return path.replace("/", 'auth/')
    }
}

export default modifyRouteProtected