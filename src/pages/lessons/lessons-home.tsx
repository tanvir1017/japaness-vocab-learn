"use client";
import axiosApi from "@/api/axios";
import { useEffect, useState } from "react";
type Name = {
  firstName: string;
  lastName: string;
  _id: string;
};

type Lerner = {
  _id: string;
  user: string;
  email: string;
  gender: string;
  isDeleted: boolean;
  name: Name;
  profileImg: string;
  __v: number;
};

type LernerResponse = {
  success: boolean;
  message: string;
  data: Lerner[];
};

function LessonsHome() {
  const [user, setUser] = useState<LernerResponse>();
  useEffect(() => {
    let isMounted = true;
    const container = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosApi.get("/lerner", {
          signal: container.signal,
        });

        console.log(response.data);
        if (isMounted) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      container.abort();
    };
  }, []);
  const payload = {
    title: "new post",
    content: "This is a new post",
  };
  const refresh = async () => {
    const refresh = await axiosApi.post("/posting", payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Important: This allows cookies to be sent
    });
    console.log(refresh.data);
  };
  return (
    <div>
      {user?.data.length ? (
        <ul>
          {user.data.map((userInfo, i) => (
            <li key={i}>{userInfo.email}</li>
          ))}
        </ul>
      ) : (
        <p>no user found</p>
      )}
      <button onClick={() => refresh()}>refresh</button>
    </div>
  );
}

export default LessonsHome;
