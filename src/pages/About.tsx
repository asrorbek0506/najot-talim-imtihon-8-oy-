import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { stats } from "../data/home.data";
import { milestones, teamMembers, values } from "../data/about.data";
import type { IconName } from "../types/dashboard.type";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageHero
        breadcrumb="Biz haqimizda"
        title="Bizning hikoyamiz"
        subtitle="2015-yilda kichik bir auditoriyada boshlanib, bugun O'zbekistondagi eng yirik
online IT va dizayn ta'lim platformalaridan biriga aylandik. 10 yil ichida 5000+
talabani bitirib, ularning hayotini o'zgartirishga ulush qo'shdik.
Bizning maqsad — har bir o'zbek yoshining zamonaviy mehnat bozorida
muvaffaqiyatli o'rin egallashiga yordam berish."
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=60"
              alt="Jamoa yig'ilishi"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Missiyamiz</h3>
              <p className="mt-2 leading-relaxed text-gray-600">
                O'zbek yoshlariga zamonaviy IT va dizayn sohalarida sifatli,
                amaliy va keng qamrovli ta'lim berish. Har bir bitiruvchi mehnat
                bozorida raqobatbardosh mutaxassis sifatida o'rin egallashi.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Vizyonimiz</h3>
              <p className="mt-2 leading-relaxed text-gray-600">
                2030-yilga borib Markaziy Osiyodagi eng nufuzli IT ta'lim
                platformalaridan biriga aylanish. 50 000+ bitiruvchiga ega
                bo'lish va xalqaro miqyosda tan olinish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50/60 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Qadriyatlarimiz"
            title="Nima uchun bizni tanlashadi"
            subtitle="Har bir qarorimiz uchta asosiy qadriyatga tayanadi."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((value) => {
              const IconComponent = Icon[value.icon as IconName];
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 p-6 text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <IconComponent />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tariximiz"
            title="Bosqichma-bosqich rivojlanish"
            subtitle="2015-yildan bugungi kungacha bosib o'tgan yo'limiz."
          />

          <div className="mt-10 space-y-8 border-l border-gray-200 pl-8">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-4 ring-white">
                  •
                </span>
                <p className="text-sm font-bold text-blue-600">
                  {milestone.year}
                </p>
                <h3 className="mt-1 text-base font-semibold text-gray-900">
                  {milestone.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Jamoamiz"
            title="Bizning xodimlar"
            subtitle="Tajribali va o'z ishiga fidoyi mutaxassislar jamoasi."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-28 w-28 rounded-full object-cover"
                />
                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Bizning oilamizga qo'shiling
          </h2>
          <p className="mt-3 text-blue-100">
            Bugun ro'yxatdan o'ting va kelajagingizni biz bilan quring.
          </p>
          <Link to="/register" className="mt-6 inline-block">
            <Button variant="google" rightIcon={<Icon.arrowRight />}>
              Ro'yxatdan o'tish
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
