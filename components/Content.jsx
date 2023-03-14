import Image from "next/image";
import srcIcon from "../public/img/searchIcon2.svg";
import drop from "../public/img/drop.svg";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Content() {
  const [city, SetCity] = useState("");
  const [cityName, SetCityName] = useState("");
  const [flagIco, setFlagIco] = useState("");
  const flag = `https://hatscripts.github.io/circle-flags/flags/${flagIco}.svg`;
  const [description, SetDescription] = useState("");
  const [iconTemp, setIconTemp] = useState("");
  const [tempMax, SetTempMax] = useState("0");
  const [tempMin, SetTempMin] = useState("0");
  const [tempNow, SetTempNow] = useState("0");
  const [humidity, SetHumidity] = useState("0");
  const [disable, SetDisable] = useState(false);

  const imageIconTemp = `https://openweathermap.org/img/wn/${iconTemp}@2x.png`;

  const options = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=931d58d20ef22eb4b48d8e307347631e&lang=pt_br`,
  };

  const handleClick = async () => {
    if (!city) {
      toast.error("Digite uma cidade!", {
        style: {
          background: "#000D81",
          color: "#f7f7f7",
          border: "2px solid #FFC107",
          borderRadius: "30px",
        },
        iconTheme: {
          primary: "#FFC107",
          secondary: "#000D81",
        },
      });
      return;
    }

    await axios
      .request(options)
      .then(function (response) {
        SetDisable(true);
        const cityData = response.data.name;
        const flagInitials = response.data.sys.country;
        const descriptionData = response.data.weather[0].description;
        const IconTempData = response.data.weather[0].icon;
        const tempmaxData = response.data.main.temp_max;
        const tempminData = response.data.main.temp_min;
        const tempNowData = response.data.main.temp;
        const humidityData = response.data.main.humidity;
        SetHumidity(humidityData);
        SetTempNow(parseInt(tempNowData));
        SetTempMin(parseInt(tempminData));
        SetTempMax(parseInt(tempmaxData));
        setIconTemp(IconTempData);
        SetDescription(descriptionData);
        SetCityName(cityData);
        setFlagIco(flagInitials.toLowerCase());
        SetCity("");
      })
      .catch(function (error) {
        console.error(error);
        SetCity("");
        toast.error("Cidade não encontrada!", {
          style: {
            background: "#000D81",
            color: "#f7f7f7",
            border: "2px solid #FFC107",
            borderRadius: "30px",
          },
          iconTheme: {
            primary: "#FFC107",
            secondary: "#000D81",
          },
        });
        return;
      })
      .finally(function () {
        SetDisable(false);
      });
  };

  return (
    <>
    {/* TOAST */}

    <Toaster position="top-center" reverseOrder={false} />

    {/* SEARCH */}

    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="font-semibold text-sm uppercase text-white">
        Confira o clima de uma cidade:
        </h1>

      <div className="relative">
        <Image
          src={srcIcon}
          className="absolute right-[5px] top-[50%] translate-y-[-50%] w-10 cursor-pointer"
          alt="Procurar"
          onClick={handleClick}
          disable={disable}
        />
        <input
          type="text"
          className=" w-[90vw] sm:w-[500px] px-4 py-2 rounded-[60px] border-2 border-secondary bg-primary text-white "
          placeholder="Tokyo"
          onChange={({ target }) => SetCity(target.value)}
          value={city}
        />
      </div>
    </div>

    {/* WEATHER INFORMATION */}
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 bg-primary translate-y-6 p-2">
        <h1 className="font-bold text-2xl text-white"> {cityName} </h1>
        {flagIco ? (
          <Image
            src={flag}
            width={25}
            height={25}
            draggable="false"
            alt="País"
          />
        ) : (
            ""
          )}
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-secondary rounded-[30px] w-[80vw] sm:w-[400px] py-3 gap-4">
        <div className="flex flex-col items-center justify-center">
          {iconTemp ? (
            <Image
              src={imageIconTemp}
              width={45}
              height={45}
              draggable="false"
              alt="Condição do Tempo"
            />
          ) : (
              ""
            )}

          <h1 className="font-[600] text-[15px] text-secondary">
            {" "}
            {description}{" "}
          </h1>
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center">
            <span className="font-[500] text-xs uppercase text-white">agora</span>
            <span className="font-bold text-2xl text-secondary">
              {tempNow} °C
              </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center">
            <span className="font-[500] text-xs uppercase text-white">min</span>
            <span className="font-bold text-base text-secondary">
              {tempMin} °C
              </span>
          </div>

          <div className="h-[30px] border-l-2 border-l-white" />

          <div className="flex flex-col justify-center items-center">
            <span className="font-[500] text-xs uppercase text-white">max</span>
            <span className="font-bold text-base text-secondary">
              {tempMax} °C
              </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <Image src={drop} alt="chuva porcentagem" draggable="false" />
          <span className="text-base text-white">
            {humidity}
            <span className="text-secondary">%</span>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
