//specifically for the items on the categoyr/[categorytype]
"use client"

import { Dispatch, SetStateAction } from "react"
import { Cross1Icon, MixerHorizontalIcon, MixerVerticalIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export interface filterProps {
  id: "price" | "brand" | "type",
  name: "Price" | "Brand" | "Type",
  options: optionProp[]
}

export interface optionProp {
  id: string,
  label: string,
  checked: boolean,
  radio?: boolean
}



export function FilterModal({filterProps, setFilterProps, beforeFilter, setBeforeFilter}:{
  filterProps: filterProps[]
  setFilterProps: Dispatch<SetStateAction<filterProps[]>>
  beforeFilter: filterProps[]
  setBeforeFilter: Dispatch<SetStateAction<filterProps[]>>
}) {


  const categories = filterProps;
  const setCategories = setFilterProps;

  // const [categories, setCategories] = useState<filterProps[]>()
  let [openModal, setOpenModal] = useState(false);
  let [activeFilter, setActiveFilter] = useState<"price"|"brand"|"type">("price")
  let [filtering, ] = useState(false)

  function clickHandle() {
    setOpenModal(m => !m)
    setFilterProps(beforeFilter)
  }
  

  return <div>
    <div className="flex overflow-scroll w-full pl-4 my-2 h-8 gap-6 typebar">
      <div onClick={function () {
        setOpenModal(true)
      }} className={"flex justify-between items-center border text-xs gap-2 px-4 rounded" + `${filtering ? "text-primary bg-sky-400/50 border border-primary":" border-black text-black"}`}><MixerHorizontalIcon className={filtering ? "text-white":"text-black"}/> Filter</div>
      {
        categories.map((m, index) => {
          let filterValue = m.name;
          let filterId = m.id;
          let options = m.options.every(m => m.checked == false);

          if(!options) {
              return <div onClick={function () {
            setActiveFilter(filterId)
            setOpenModal(true)
          }} key={filterId} className={"flex justify-between items-center border text-xs gap-2 px-4 rounded text-primary bg-sky-200/50 border-primary"}>{filterValue}</div>
          }
   
          return <div onClick={function () {
            setActiveFilter(filterId)
            setOpenModal(true)
          }} key={filterId} className={"flex justify-between items-center border-1 text-xs gap-2 px-4 rounded  border-gray-500/50 text-gray-500/80"}>{filterValue}</div>
        })
      }
    </div>
    {openModal && <div className="flex items-end-safe h-full z-10 pb-21  w-full bg-gray-400/60 left-0 absolute bottom-0 overflow-hidden">
    <div onClick={clickHandle} className="w-8 cursor-pointer h-8 absolute left-[48%] top-[35%] bg-gray-700 text-white z-6 flex justify-center items-center rounded-full border">
      <Cross1Icon />
    </div>
    <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-lg bg-white ">
      <FilterModalValue setBeforeFilter={setBeforeFilter} setOpenModal={setOpenModal} active={activeFilter} categories={categories} setCategories={setCategories} />
    </div>
  </div>}
  </div>
}


export default function FilterModalValue({
  categories,
  setCategories,
  setBeforeFilter,setOpenModal ,
  active
}: {
  categories: filterProps[]
  setCategories: Dispatch<SetStateAction<filterProps[]>>,setOpenModal:any
  setBeforeFilter: Dispatch<SetStateAction<filterProps[]>>, active : "price" | "brand"| "type"
}) {
  

  const [activeCategory, setActiveCategory] = useState<string>(active || "price")

  const handleCheckboxChange = (categoryId: string, optionId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, checked: !option.checked }
              }
              return option
            }),
          }
        }
        return category
      }),
    )
  }

  const handleRadioboxChange = (categoryId: string, optionId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => {
              if (option.id === optionId) {
                return { ...option, checked: true }
              }
              return {...option, checked:false}
            }),
          }
        }
        return category
      }),
    )
  }

  const clearAll = () => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          checked: false,
        })),
      })),
    )
  }

  const getActiveOptions = () => {
    const category = categories.find((category) => category.id === activeCategory)
    return category ? category.options : []
  }

  const getSelectedCount = () => {


    return categories.reduce((count, category) => {
      return count + category.options.filter((option) => option.checked).length
    }, 0)
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <h1 className="text-xl font-bold text-gray-900">Filters</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-1/3 border-r border-gray-200 bg-white">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-4 cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50 ${activeCategory === category.id ? "bg-blue-50 border-r-2 border-r-blue-600" : ""
                }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="block truncate text-gray-900 font-medium">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Options Area */}
        <div className="w-2/3 bg-white">
          <div className="h-full overflow-y-auto">
            <div className="p-1">
              {getActiveOptions().map((option) => {

                if (option.radio) {
                  return (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <label htmlFor={option.id} className="text-gray-900 cursor-pointer flex-1">
                        {option.label}
                      </label>
                      <div className="relative">
                        <input
                          type="radio"
                          id={option.id}
                          checked={option.checked}
                          onChange={() => handleRadioboxChange(activeCategory, option.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border-2 rounded-full p-2 cursor-pointer transition-all ${option.checked ? "bg-blue-600 border-primary" : "border-gray-300 hover:border-gray-400"
                            }`}
                          onClick={() => handleRadioboxChange(activeCategory, option.id)}
                        >
                        </div>
                      </div>
                    </div>
                  )
                }



                return (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <label htmlFor={option.id} className="text-gray-900 cursor-pointer flex-1 text-sm capitalize">
                      {option.label}
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={option.id}
                        checked={option.checked}
                        onChange={() => handleCheckboxChange(activeCategory, option.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded cursor-pointer transition-all ${option.checked ? "bg-blue-600 border-blue-600" : "border-gray-300 hover:border-gray-400"
                          }`}
                        onClick={() => handleCheckboxChange(activeCategory, option.id)}
                      >
                        {option.checked && (
                          <svg
                            className="w-4 h-4 text-white absolute top-0.5 left-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-white">
        <button
          onClick={clearAll}
          className="text-blue-600 cursor-pointer font-medium hover:text-blue-700 transition-colors px-4 py-2 rounded hover:bg-blue-50"
        >
          Clear all
        </button>
        <button onClick={function () {
          setBeforeFilter(categories);
          setOpenModal(false)
        }} className="bg-blue-600 hover:bg-blue-700 cursor-grab text-white font-medium px-8 py-2 rounded transition-colors shadow-sm">
          Apply
          {getSelectedCount() > 0 && <span className="ml-1">({getSelectedCount()})</span>}
        </button>
      </div>
    </div>
  )
}
