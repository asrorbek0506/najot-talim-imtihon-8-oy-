import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { courses } from "../../data/courses.data";
import { allTeachers } from "../../data/teachers.data";

const weekDays = ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan", "Yak"];

interface CreateGroupForm {
  name: string;
  courseTitle: string;
  teacher: string;
  maxStudents: number;
  room: string;
  startDate: string;
  startTime: string;
  endTime: string;
}

const CreateGroup = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Dush",
    "Chor",
    "Juma",
  ]);

  const form = useForm<CreateGroupForm>({
    defaultValues: {
      courseTitle: courses[0]?.title ?? "",
      teacher: allTeachers[0]?.name ?? "",
      maxStudents: 16,
    },
  });
  const {
    formState: { errors },
  } = form;

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const onSubmit = (data: CreateGroupForm) => {
    if (selectedDays.length === 0) {
      toast.error("Kamida bitta dars kunini tanlang");
      return;
    }
    toast.success(`"${data.name}" guruhi muvaffaqiyatli yaratildi`);
    navigate("/admin/groups");
  };

  return (
    <div className="space-y-6">
      <Link
        to="/admin/groups"
        className="flex w-fit items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Icon.arrowLeft />
        Guruhlar ro'yxati
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Yangi guruh yaratish
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Guruh ma'lumotlari va dars jadvalini kiriting.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Asosiy ma'lumotlar
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input
              name="name"
              type="text"
              form={form}
              placeholder="Masalan: Frontend-07"
              label="Guruh nomi"
              required
              error={errors.name?.message}
              rules={{ required: "Guruh nomini kiriting" }}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">Kurs</label>
              <select
                {...form.register("courseTitle", { required: true })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                O'qituvchi
              </label>
              <select
                {...form.register("teacher", { required: true })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {allTeachers.map((teacher) => (
                  <option key={teacher.name} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              name="maxStudents"
              type="number"
              form={form}
              placeholder="16"
              label="Maksimal talabalar soni"
              required
              error={errors.maxStudents?.message}
              rules={{ required: "Talabalar sonini kiriting", min: 1 }}
            />

            <Input
              name="room"
              type="text"
              form={form}
              placeholder="Masalan: 201-xona"
              label="Xona"
              leftIcon={<Icon.location />}
            />

            <Input
              name="startDate"
              type="date"
              form={form}
              placeholder=""
              label="Boshlanish sanasi"
              required
              error={errors.startDate?.message}
              rules={{ required: "Boshlanish sanasini kiriting" }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Dars jadvali</h2>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Dars kunlari
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedDays.includes(day)
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input
              name="startTime"
              type="time"
              form={form}
              placeholder=""
              label="Boshlanish vaqti"
              required
              error={errors.startTime?.message}
              rules={{ required: "Boshlanish vaqtini kiriting" }}
            />
            <Input
              name="endTime"
              type="time"
              form={form}
              placeholder=""
              label="Tugash vaqti"
              required
              error={errors.endTime?.message}
              rules={{ required: "Tugash vaqtini kiriting" }}
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button type="submit">Guruhni yaratish</Button>
          <Link to="/admin/groups">
            <button
              type="button"
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Bekor qilish
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
