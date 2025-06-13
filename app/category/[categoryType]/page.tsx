import { CategoryAll } from "@/app/ui/category/categoryAll";
import { CategoryBody } from "@/app/ui/category/categoryBody";
import { TypeBar } from "@/app/ui/category/typeBar";
import { TopBar } from "@/app/ui/dashboard/topBar";


export default async function Page({ params }: { params: Promise<{ categoryType: string }> }) {
    let categoryType = (await params);
    let data = categoryType.categoryType.split("_").join(" , ");
    
    if(data.includes("-")) {
        data = data.replace("-", " ")
    }
    let index = data.lastIndexOf(",");
    if(index !=-1) {
        data = data.substring(0, index) + "&" + data.substring(index+1)
    }

    return <div className="bg-[#EBF6FF] h-screen overflow-hidden text-black select-none overscroll-none">
        <TopBar>
           <CategoryAll data={data}/>
        </TopBar>
        <div >
            {/* //body  */}
          <CategoryBody categoryType={categoryType.categoryType}/>
        </div>

        {/* // no bottom bar for this */}
    </div>
}

// to do 
// type defined in the items itself -- categorizing further
// filter module -- sorting , based on the certain things
// outof stock module
// fetching data in pagination i.e loading
//--fitler -> price , brand , type
// adding more items value to the items -- for outofstock, type of further categorization, 
// having the backend ability to to add and delete the types
