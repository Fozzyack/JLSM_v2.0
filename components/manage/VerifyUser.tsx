"use client";
import React, { Fragment, useState } from "react";
import { motion } from "framer-motion";

const VerifyUser = ({ id, verified }: { id: number; verified: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleVerify = async () => {
    const res = await fetch("/api/verify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        verified: !verified,
      }),
    });
    if (!res.ok) throw new Error("Failed to change User verification");

    setOpen(false);
    window.location.reload();
  };
  return (
    <Fragment>
      {verified ? (
        <motion.button onClick={handleOpen} whileHover={{ y: -2 }}>
          <div className="py-1 px-3 w-[120px] rounded-full text-white text-center bg-green-600">
            Verified
          </div>
        </motion.button>
      ) : (
        <motion.button onClick={handleOpen} whileHover={{ y: -2 }}>
          <div className="py-1 px-3 w-[120px] rounded-full text-white text-center bg-red-600">
            Not Verified
          </div>
        </motion.button>
      )}
      {open && (
        <div className="fixed bg-black bg-opacity-60 z-20 top-0 left-0 w-full h-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-100 rounded-xl divide-y divide-slate-300 flex flex-col shadow-xl p-5 w-screen md:max-w-[400px] mx-4"
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Verify User</h3>
              <button onClick={() => setOpen(false)}>X</button>
            </div>
            <div className="py-8 flex flex-col gap-5">
              <div className="text-center">
                <p className="text-black text-center break-words">
                  Are you sure you want to {verified ? "unverify" : "verify"}{" "}
                  this user?
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {verified ? (
                  <motion.button
                    onClick={handleVerify}
                    whileHover={{ y: -2 }}
                    className="py-1 px-3 w-[120px] rounded-full text-white text-center bg-slate-500 hover:bg-slate-400 shadow-xl transition ease-in-out"
                  >
                    Unverify
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="py-1 px-3 w-[120px] rounded-full text-white text-center bg-yellow-500 hover:bg-yellow-400 shadow-xl transition ease-in-out"
                    onClick={handleVerify}
                  >
                    Verify
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ y: -2 }}
                  className="py-1 px-3 w-[120px] rounded-full text-white text-center bg-red-600"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Fragment>
  );
};

export default VerifyUser;
