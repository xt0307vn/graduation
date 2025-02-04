import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBlog,
    faCapsules, faCircleDot, faDisease,
    faList,
    faPills,
    faTablets,
    faUser,
    faUserPlus,
    faUsers
} from "@fortawesome/free-solid-svg-icons";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Danh mục',
    },
    {
        segment: 'admin/medicine',
        title: 'Thuốc',
        icon: <FontAwesomeIcon icon={faCapsules} />,
        children: [
            {
                segment: '',
                title: 'Danh sách thuốc',
                icon: <FontAwesomeIcon icon={faTablets} />,
            },
            {
                segment: 'create',
                title: 'Thêm thuốc',
                icon: <FontAwesomeIcon icon={faPills} />,
            },
        ]
    },
    {
        segment: 'admin/disease',
        title: 'Bệnh',
        icon: <FontAwesomeIcon icon={faDisease} />,
        children: [
            {
                segment: '',
                title: 'Danh sách bệnh',
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                segment: 'create',
                title: 'Thêm bệnh',
                icon: <FontAwesomeIcon icon={faCircleDot} />,
            },
            {
                segment: 'type',
                title: 'Danh sách loại',
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                segment: 'type/create',
                title: 'Thêm loại bệnh',
                icon: <FontAwesomeIcon icon={faCircleDot} />,
            },
        ]
    },
    {
        segment: 'admin/user',
        title: 'Người dùng',
        icon: <FontAwesomeIcon icon={faUser} />,
        children: [
            {
                segment: '',
                title: 'Danh sách người dùng',
                icon: <FontAwesomeIcon icon={faUsers} />,
            },
        ]
    },
    {
        segment: 'admin/post',
        title: 'Bài viết',
        icon: <FontAwesomeIcon icon={faBlog} />,
        children: [
            {
                segment: '',
                title: 'Danh sách bài viết',
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                segment: 'create',
                title: 'Tạo bài viết',
                icon: <FontAwesomeIcon icon={faCircleDot} />,
            },
            {
                segment: 'category',
                title: 'Danh mục',
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                segment: 'category/create',
                title: 'Tạo danh mục',
                icon: <FontAwesomeIcon icon={faCircleDot} />,
            },
        ]
    },

];

export default NAVIGATION