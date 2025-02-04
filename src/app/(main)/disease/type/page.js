import BreadCrumb from "@/Components/Common/BreadCrumb";

export default function() {
    const breadcrumb = [
        {
            url: "/disease",
            title: "Tra cứu bệnh"
        },
        {
            url: "/disease/type",
            title: "Loại bệnh"
        }
    ]
    return(
        <main className="screen">
            <BreadCrumb props={breadcrumb} />
            <h1>Đây là loại bệnh</h1>
        </main>
    )
}