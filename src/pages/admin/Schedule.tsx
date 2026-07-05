import { Icon } from "../../components/ui/Icon";
import { scheduleSlots } from "../../data/admin.data";

const weekDays = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

const Schedule = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dars jadvali</h1>
          <p className="mt-1 text-sm text-gray-500">
            Haftalik dars jadvali barcha faol guruhlar bo'yicha.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-6">
        {weekDays.map((day) => {
          const daySlots = scheduleSlots
            .filter((slot) => slot.day === day)
            .sort((a, b) => a.time.localeCompare(b.time));

          return (
            <div
              key={day}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <h2 className="text-sm font-bold text-gray-900">{day}</h2>

              <div className="mt-3 space-y-3">
                {daySlots.length === 0 ? (
                  <p className="text-xs text-gray-400">Dars yo'q</p>
                ) : (
                  daySlots.map((slot) => (
                    <div
                      key={slot.groupName + slot.time}
                      className="rounded-xl border border-gray-100 p-3"
                    >
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${slot.color}`}
                      >
                        {slot.groupName}
                      </span>
                      <p className="mt-2 flex items-center gap-x-1.5 text-xs text-gray-500">
                        <Icon.clock />
                        {slot.time}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {slot.teacher}
                      </p>
                      <p className="mt-0.5 flex items-center gap-x-1.5 text-xs text-gray-400">
                        <Icon.location />
                        {slot.room}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
