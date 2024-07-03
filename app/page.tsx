export default async function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-[25px] font-bold p-[30px]">Task For Upbright</h1>
      <a className="bg-green-700 px-[40px] py-[15px] text-[18px] rounded-[25px] text-white hover:bg-green-500 hover:text-green-800" href="/post">Go To Task</a>
      <h2 className="text-[20px] font-bold p-[30px]">Thanks For Watching</h2>
    </main>
  );
}