import React, { useEffect, useState } from "react";
import axios from "axios";
import { coverPhotos } from "../../data";
import { toast } from "react-toastify";
const Cover = () => {
  const [img, setimg] = useState();
  console.log(typeof(img),img)
  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      console.log(typeof(img),img)
      const formData = new FormData();
      formData.append("image", img);
      formData.append("title", "jikj");
      coverPhotos.push(formData);
      console.log(formData)
      axios.post("https://scroll-80y0.onrender.com/cover", formData).then((res) => {
        console.log(res);
        toast.success(res);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handledelete = (name) => {
    console.log(name);
    axios
      .delete(`https://scroll-80y0.onrender.com/cover/${name}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [cp, setcp] = useState({})
  // useEffect(() => {
  //   axios.get("http://localhost:5000/cover").then((res) => {
  //     console.log(res.data.data.img)
  //     setcp(res.data.data[0])
  //   });
  // }, []);
  return (
    <div
      className="min-h-screen bg-gray-900 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* <div className="h-[150px] w-[150px] bg-amber-100 ">
        <img src={cp.image} alt="khbkjv" />
      </div> */}
      <main className="max-w-7xl mx-auto my-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-flow-row grid-cols-5 gap-x-5 gap-y-10">
            {coverPhotos.map((item, idx) => (
              <div key={idx} className="flex-none w-[200px]">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-lg font-semibold">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div
                  className="rounded-2xl bg-gray-800 mt-2 flex justify-center items-center "
                  onClick={() => handledelete(item.title)}
                >
                  <h5 className="text-white text-lg font-semibold">Delete</h5>
                </div>
              </div>
            ))}
            <div className="flex-none w-[200px] relative">
              <div className="relative overflow-hidden rounded-lg">
                <div className="w-full h-[300px] bg-blue-200 object-cover transition-transform duration-300 hover:scale-105"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-lg font-semibold">Add</h3>
                </div>
              </div>
              <div className="absolute w-[200px] right-[0px] top-[50px] bg-white rounded-lg shadow-md overflow-">
                <form
                  action=""
                  className="flex flex-col"
                  onSubmit={handlesubmit}
                >
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setimg(e.target.files[0])}
                  />

                  <input
                    type="submit"
                    value="Submit"
                    className="rounded-2xl bg-gray-300 mt-2"
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cover;
