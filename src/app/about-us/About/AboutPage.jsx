import Image from "next/image";

export default function AboutPage() {
  return (
    <section className=" mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm font-semibold text-indigo-600">
            About us
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            On a mission to empower remote teams
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu,
            sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.
          </p>

          {/* Mission */}
          <h3 className="mt-12 text-lg font-semibold text-gray-900">
            Our mission
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
            Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
            donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id
            et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt
            ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing
            egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
          </p>

          {/* Numbers */}
          <div className="mt-12 border-t pt-10">
            <p className="text-sm font-semibold text-gray-500 mb-6">
              The numbers
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-gray-900">$150M</p>
                <p className="mt-1 text-sm text-gray-500">Raised</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-gray-900">30K</p>
                <p className="mt-1 text-sm text-gray-500">Companies</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-gray-900">1.5M</p>
                <p className="mt-1 text-sm text-gray-500">Deals Closed</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-gray-900">200M</p>
                <p className="mt-1 text-sm text-gray-500">Leads Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE GRID */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 pt-20">
            <Image
              src="/service1.webp"
              alt="Team meeting"
              width={400}
              height={500}
              className="rounded-xl object-cover"
            />

            <Image
              src="/service4.webp"
              alt="Office workspace"
              width={400}
              height={300}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="space-y-6 ">
            <Image
              src="/service3.webp"
              alt="Remote collaboration"
              width={400}
              height={300}
              className="rounded-xl object-cover"
            />

            <Image
              src="/service1.webp"
              alt="Team discussion"
              width={400}
              height={300}
              className="rounded-xl object-cover"
            />

          </div>
        </div>
      </div>
    </section>
  );
}
