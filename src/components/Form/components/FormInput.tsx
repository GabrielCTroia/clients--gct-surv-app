import React from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

type Props = {
	actionable?: boolean;
	render: React.ReactNode;
	icon: FontAwesomeIconProps["icon"];
};

export const FormInput: React.FC<Props> = ({ actionable, render, icon }) => {
	return (
		<div
			className={cx(
				"flex relative justify-between group bg-background-100 border-2 border-black font-main mb-10",
				actionable ? "drop-shadow-6xl-pink hover:text-white" : "drop-shadow-6xl"
			)}
		>
			{actionable && (
				<div className="bg-primary-200 w-0 h-full group-hover:w-full group-hover:transition-all duration-300 group-hover:duration-300 ease-in-out absolute top-0 left-0" />
			)}
			<div className={cx("p-2 text-left pl-5 z-50")}>{render}</div>
			<div
				className={cx(
					"w-16 border-black border-l-2 z-50 flex justify-center items-center",
					actionable ? "bg-primary-200" : "bg-primary-100"
				)}
			>
				<FontAwesomeIcon icon={icon} size="lg" />
			</div>
		</div>
	);
};
