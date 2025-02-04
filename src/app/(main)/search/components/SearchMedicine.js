"use client"

import Medicine from "@/Components/Medicine";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

export default function SearchMedicine({medicine}) {
    const [page, setPage] = useState(1)
    
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        queryClient.removeQueries()
        queryClient.invalidateQueries({ queryKey: ["MainMedicne"]})
    }
    
    return(
        <div>
            <div className="medicine__list grid grid-cols-5 gap-5 py-10">
                {
                    medicine && medicine?.data?.map((item, index) => {
                        return (
                            <Medicine key={index} data={item} />
                        )
                    })
                }
            </div>
            <div>
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(medicine?.total / medicine?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-center pb-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    )
}