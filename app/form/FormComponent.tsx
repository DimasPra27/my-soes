import { Input } from "@/components/ui/input";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Form() {
  return (
    <div>
      {/* <section className="bg-emerald-800/70 backdrop-blur-md rounded-xl p-6 pb-0 shadow-lg"> */}
      <Card>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center items-center text-center gap-10">
            {/* <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
              Podjok Soes
            </h1> */}
            <img src="/Logo.png" alt="" className="w-xs h-xs" />
            <p className="mb-6 text-lg font-normal text-emerald-100 lg:text-xl">
              Saya meminta untuk apresiasi customer untuk memberikan kami
              masukan :
            </p>
          </div>

          <div>
            <div className="w-full lg:max-w-xl p-8 space-y-8 bg-emerald-950/60 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-700/30">
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Name
                  </label>
                  <Input
                    type="text"
                    className=""
                    placeholder="Your Name"
                    id="email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Email
                  </label>
                  <Input
                    type="email"
                    className=""
                    placeholder="Your Email"
                    id="email"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    className=""
                    placeholder="+62"
                    id="phoneNumber"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-emerald-100">
                    Kesan Pesan
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enak banget kue soes nya"
                    className="h-20 bg-emerald-900/50 border border-emerald-700 text-emerald-50 placeholder-emerald-300 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-5 py-3 text-base font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 focus:ring-4 focus:ring-emerald-300 transition-all"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
      {/* </section> */}
    </div>
  );
}
