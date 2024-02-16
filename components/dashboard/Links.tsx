"use client";
import React from "react";
import Link from "next/link";
import { getSessionContext } from "@/hooks/session";
import { usePathname } from "next/navigation";
const LINKS = [
	{
		name: "Dashboard",
		href: "/dashboard",
		req_priv: 0,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Other Members",
		href: "/dashboard/members",
		req_priv: 0,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Extra Resources",
		href: "/dashboard/resources",
		req_priv: 0,
		svg: (
			<svg
				className="w-6 h-6"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M11 4.7C8.7 4.1 6.8 4 4 4a2 2 0 0 0-2 2v11c0 1.1 1 2 2 2 2.8 0 4.5.2 7 .8v-15Zm2 15.1c2.5-.6 4.2-.8 7-.8a2 2 0 0 0 2-2V6c0-1-.9-2-2-2-2.8 0-4.7.1-7 .7v15.1Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Add Funds",
		href: "/dashboard/addfunds",
		req_priv: 0,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M4 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
					clip-rule="evenodd"
				/>
				<path
					fill-rule="evenodd"
					d="M5 14c0-.6.4-1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0c0-.6.4-1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Classes",
		href: "/dashboard/manageclass",
		req_priv: 2,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M14 4.2a4.1 4.1 0 0 1 5.8 0 4 4 0 0 1 0 5.7l-1.3 1.3-5.8-5.7L14 4.2Zm-2.7 2.7-5.1 5.2 2.2 2.2 5-5.2-2.1-2.2ZM5 14l-2 5.8c0 .3 0 .7.3 1 .3.3.7.4 1 .2l6-1.9L5 13.8Zm7 4 5-5.2-2.1-2.2-5.1 5.2 2.2 2.1Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Manage Users",
		href: "/dashboard/manage",
		req_priv: 2,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
	{
		name: "Transactions",
		href: "/dashboard/transactions",
		req_priv: 2,
		svg: (
			<svg
				className="w-6 h-6 "
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M4 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
					clip-rule="evenodd"
				/>
				<path
					fill-rule="evenodd"
					d="M5 14c0-.6.4-1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0c0-.6.4-1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
];
const NavbarLinks = () => {
	const session = getSessionContext();
	const pathname = usePathname();
	return (
		<div className="flex flex-col items-start w-full overflow-hidden">
			{LINKS.map((link, index) => {
				if (
					session &&
					session.user &&
					session.user.privilege >= link.req_priv
				) {
					return (
						<Link
							href={link.href}
							key={index}
							className={` ml-1 w-full overflow-hidden `}
						>
							<div
								className={`md:pl-4 md:h-16 w-full flex flex-row gap-4 group items-center justify-center md:justify-start ${pathname === link.href ? "text-yellow-500 md:bg-slate-100 md:rounded-l-full md:shadow-inner" : "text-gray-500"} cursor-pointer transition-all duration-500 ease-in-out`}
							>
								<div
									className={`w-9 h-9 flex items-center justify-center transition-all duration-500 ease-in-out  rounded-full ${pathname === link.href ? "bg-amber-200 shadow-lg" : "group-hover:mb-2 group-hover:shadow-lg"}`}
								>
									{link.svg}
								</div>
								<p className=" hidden md:block text-base">
									{link.name}
								</p>
							</div>
						</Link>
					);
				}
			})}
		</div>
	);
};
export default NavbarLinks;
