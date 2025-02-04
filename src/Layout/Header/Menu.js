import Link from "next/link";

export default function Search() {
    const menu = [
        {
            url: '/home',
            title: 'Trang chủ'
        },
        {
            url: '/disease',
            title: 'Bệnh'
        },
        {
            url: '/medicine',
            title: 'Thuốc'
        },
        {
            url: '/care',
            title: 'Chăm sóc cá nhân'
        },
        {
            url: '/post',
            title: 'Góc chia sẻ'
        },
        // {
        //     url: '/admin',
        //     title: 'Admin'
        // },
    ]
    return (
        <ul className="header__menu flex gap-5 justify-center">
            {
                menu.map((item, index) => {
                    return (
                        <li className="menu__item text-medium" key={index}>
                            <Link href={item.url} className="p-1">{item.title}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}