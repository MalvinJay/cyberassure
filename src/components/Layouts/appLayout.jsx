import React from "react";
import Header from "./Header";
import Side from "./Side";
import 'antd/dist/reset.css';

const AppLayout = ({ children }) => {
  return (
    <section>
      <aside className="bg-default ml-[-100%] fixed z-10 top-0 pb-3 w-full flex flex-col h-screen border-r transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <Side />
      </aside>

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Header />

        <main className="w-full 2xl:container">
          {children}
        </main>
      </div>
    </section>
  );
};

export default AppLayout;
