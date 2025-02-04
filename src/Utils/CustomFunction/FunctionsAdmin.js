const hanldleScrollTopAdmin = () => {
    const mainAdmin = document.querySelector("main.MuiBox-root.css-23htwk")
    setTimeout(() => {
        mainAdmin.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth", // Cuộn mượt
        });
    }, 500)
}

export { hanldleScrollTopAdmin }