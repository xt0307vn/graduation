"use client"

import convertToSlug from "@/Utils/CustomFunction/CovertToSlug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import generateArray from "@/Utils/CustomFunction/GenerateArray"

export default function Datepicker({name, onSetValue, value, error, placeholder = ""}) {
    const [today, setToday] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(today.getDate())
    const [month, setMonth] = useState(today.getMonth())
    const [year, setYear] = useState(today.getFullYear())
    const [dates, setDates] = useState([])
    const [datesPrev, setDatesPrev] = useState([])
    const dateRef = useRef()
    const datePickerRef = useRef()
    const [showDatepicker, setShowDatepicker] = useState(false)
    
    const generateDates = (month, year) => {
        const lastOfPreviousMonth = new Date(year, month, 0)
        const lastOfMonth = new Date(year, month + 1, 0)
        setDates(generateArray(1, lastOfMonth.getDate()))
        setDatesPrev(generateArray(lastOfPreviousMonth.getDate() - lastOfPreviousMonth.getDay() + 1, lastOfPreviousMonth.getDate()))
    }
    
    const onSetAllValue = (d, m, y) => {
        setYear(y)
        setMonth(m)
        onSetValue(`${d}/${m + 1}/${y}`)
    }
    const handleNextMonth = () => {
        const reYear = month == 11 ? year + 1 : year;
        const reMonth = (month + 1) % 12
        onSetAllValue(selectedDate, reMonth, reYear)
        generateDates(reMonth, reYear)
    }
    
    const handlePrevMonth = () => {
        const reYear = month == 0 ? year - 1 : year;
        const reMonth = (month - 1 + 12) % 12
        onSetAllValue(selectedDate, reMonth, reYear)
        generateDates(reMonth, reYear)
    }
    
    const handleSelectedDate = (date) => {
        setSelectedDate(date)
        onSetValue(`${date}/${month + 1}/${year}`)
    }
    
    useEffect(() => {
        generateDates(month, year)
        
        window.addEventListener('click', function (e) {
            if (dateRef.current && !dateRef.current.contains(e.target) && datePickerRef.current && !datePickerRef.current.contains(e.target)) {
                setShowDatepicker(false)
            }
        })
        
    }, [selectedDate, month, year]);
    return (
        <div className="w-full relative">
            <label htmlFor={convertToSlug(name)}>
                <h3 className={`text-medium font-medium ${error && 'text-red-600'} mb-1`}>{name}</h3>
            </label>
            <div ref={dateRef} className={`flex gap-1 border-current border-[0.0625rem] border-solid rounded-md px-3 py-2 ${showDatepicker && "!border-primary !border-2"}`} onClick={() => setShowDatepicker(!showDatepicker)}>
                <p className="flex-1">{value && value}</p>
                <div className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">
                    <FontAwesomeIcon icon={faCalendarDays} className="" />
                </div>
            </div>
            {showDatepicker && (
                <div ref={datePickerRef} className="datepicker shadow-lg">
                    <div className="datepicker--header flex justify-between items-center mb-4">
                        <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <div>
                            <select value={month} onChange={(e) => setMonth(+e.target.value)}>
                                <option value={0}>Tháng 1</option>
                                <option value={1}>Tháng 2</option>
                                <option value={2}>Tháng 3</option>
                                <option value={3}>Tháng 4</option>
                                <option value={4}>Tháng 5</option>
                                <option value={5}>Tháng 6</option>
                                <option value={6}>Tháng 7</option>
                                <option value={7}>Tháng 8</option>
                                <option value={8}>Tháng 9</option>
                                <option value={9}>Tháng 10</option>
                                <option value={0}>Tháng 11</option>
                                <option value={11}>Tháng 12</option>
                            </select>
                            <input type="number" className="year max-w-16" value={year} onChange={e => setYear(e.target.value)} />
                        </div>
                        <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <div className="datepicker--body">
                        <div className="days">
                            <p>Thứ 2</p>
                            <p>Thứ 3</p>
                            <p>Thứ 4</p>
                            <p>Thứ 5</p>
                            <p>Thứ 6</p>
                            <p>Thứ 7</p>
                            <p>Chủ nhật</p>
                        </div>
                        <div className="dates">
                            {
                                datesPrev.map((date, index) => (
                                    <button disabled key={index}>{date}</button>
                                ))
                            } {
                            dates.map((date, index) => (
                                <button key={index} className={`${today.getDate() == date && today.getMonth() == month && today.getFullYear() == year ? 'today' : ""} ${date == selectedDate && 'selected'}`} onClick={() => handleSelectedDate(date)}>{date}</button>
                            ))
                        }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}