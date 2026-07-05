import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import type { ApiInstructorListItem } from "../../types/api/instructor.type";
import { formatRating } from "../../utils/format";

const TeacherCard = ({ teacher }: { teacher: ApiInstructorListItem }) => {
  const fullName = `${teacher.firstName} ${teacher.lastName}`;

  return (
    <Link
      to={`/teachers/${teacher.id}`}
      className="block rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      <img
        src={teacher.avatarUrl || "https://i.pravatar.cc/150"}
        alt={fullName}
        className="mx-auto h-20 w-20 rounded-full object-cover"
      />
      <h3 className="mt-4 text-base font-semibold">{fullName}</h3>
      <p className="mt-1 text-sm font-medium text-blue-600">
        {teacher.specialty}
      </p>
      {teacher.bio && (
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {teacher.bio}
        </p>
      )}
      <div className="mt-5 grid grid-cols-2 border-t border-gray-100 pt-4">
        <div>
          <p className="text-sm font-bold">{teacher.experience}</p>
          <p className="text-xs text-gray-400">Yil tajriba</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="flex items-center gap-x-1 text-sm font-bold">
            <Icon.star />
            {formatRating(teacher.rating)}
          </p>
          <p className="text-xs text-gray-400">Reyting</p>
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;
