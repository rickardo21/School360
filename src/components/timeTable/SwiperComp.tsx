import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TimetableGroupedByDay } from "../../types";
import TimeTableCard from "./TimeTableCard";

interface SwiperCompProps {
	days: string[];
	table: TimetableGroupedByDay | null;
	onChange: () => void;
}

const SwiperComp: React.FC<SwiperCompProps> = ({ days, table, onChange }) => {
	return (
		<Swiper
			className="my-swiper"
			spaceBetween={0}
			slidesPerView={1}
			onSlideChange={() => onChange()}>
			{days.map((item: string, index) => (
				<SwiperSlide key={index} className="my-slide">
					{table && table[item] && table[item].length > 0 ? (
						table?.[item]?.map((h, indexTable) => (
							<TimeTableCard key={indexTable} h={h} />
						))
					) : (
						<div className="no-lesson">
							<div>non sono presenti lezioni</div>
						</div>
					)}
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperComp;
