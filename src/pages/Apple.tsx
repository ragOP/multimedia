import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Head_bg from "../assets/applesingh.png";
import Headline from "../assets/appleheading.png";

// google tag manager

const tagManagerArgs = {
  gtmId: "GTM-K2JDVPLH",
};

TagManager.initialize(tagManagerArgs);

export default function Fifth_SP() {
  useEffect(() => {
    window.document.title = "Verifique su elegibilidad ahora";

    axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
      .then(({ data }) => {
        if (data.length === 0) {
          const visits = {
            visits: 1,
            views: 0,
            calls: 0,
            positives: 0,
            negatives: 0,
          };

          axios
            .post(
              process.env.REACT_APP_PROXY + `/visits/create-visits8`,
              visits
            )
            .catch((err) => console.log(err));
        } else {
          const _id = data[0]._id;
          const _visits = data[0].visits;
          const _views = data[0].views;
          const _calls = data[0].calls;
          const _positives = data[0].positives;
          const _negatives = data[0].negatives;

          const visits = {
            visits: _visits + 1,
            views: _views,
            calls: _calls,
            positives: _positives,
            negatives: _negatives,
          };
          axios
            .put(
              process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
              visits
            )
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCall = () => {
    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls + 1,
        positives: _positives,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const [quiz, setQuiz] = useState(
    "1. ¿Tienes Actualmente Más de $10,000 en Deudas?"
  );
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState<any>(0);
  

  const stepProcess = () => {
    if (step === "Revisando sus respuestas...") {
      setTimeout(() => {
        setStep("Coincidencia con las mejores opciones...");
      }, 1500);
    }
    if (step === "Coincidencia con las mejores opciones...") {
      setTimeout(() => {
        setStep("Confirmando elegibilidad...");
      }, 1500);
    }
    if (step === "Confirmando elegibilidad...") {
      setTimeout(() => {
        setStep("completed");

        axios
          .get(process.env.REACT_APP_PROXY + `/visits/8`)
          .then(({ data }) => {
            const _id = data[0]._id;
            const _visits = data[0].visits;
            const _views = data[0].views;
            const _calls = data[0].calls;
            const _positives = data[0].positives;
            const _negatives = data[0].negatives;
            const visits = {
              visits: _visits,
              views: _views + 1,
              calls: _calls,
              positives: _positives,
              negatives: _negatives,
            };
            axios
              .put(
                process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
                visits
              )
              .catch((err) => console.log(err));
          });
      }, 1500);
    }

    if (step === "completed") {
      const startTime: any = new Date();
      const timer = setInterval(() => {
        const nowTime: any = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 1000);
    }
  };

  const messages = [
		"Alejandro Sánchez from Miami, FL acaba de calificar para $37,621 en Alivio de Deuda.",
		"Sofia García from Los Angeles, CA acaba de calificar para $28,945 en Alivio de Deuda.",
		"Mateo López from San Antonio, TX acaba de calificar para $45,213 en Alivio de Deuda.",
		"Valentina Hernández from Albuquerque, NM acaba de calificar para $21,874 en Alivio de Deuda.",
		"Diego Martínez from Phoenix, AZ acaba de calificar para $34,567 en Alivio de Deuda"
];

// Function to shuffle array in place
const shuffleArray = (array:any) => {
		for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}
};

shuffleArray(messages);

const notify = (message:any) => {
		// Dismiss all existing toasts
		toast.dismiss();
		let boldedMessage = message;


		// Make the word "Allowance" bold in all lines
		boldedMessage = boldedMessage.replace(
				/\$37,621 en Alivio de Deuda/g,
				'<strong class="green-bold">$37,621 en Alivio de Deuda.</strong>'
		);
		boldedMessage = boldedMessage.replace(
			/\$28,945 en Alivio de Deuda./g,
			'<strong class="green-bold">$28,945 en Alivio de Deuda.</strong>'
	);
	boldedMessage = boldedMessage.replace(
		/\$45,213 en Alivio de Deuda./g,
		'<strong class="green-bold">$45,213 en Alivio de Deuda.</strong>'
);
boldedMessage = boldedMessage.replace(
	/\$21,874 en Alivio de Deuda./g,
	'<strong class="green-bold">$21,874 en Alivio de Deuda.</strong>'
);
boldedMessage = boldedMessage.replace(
	/\$34,567 en Alivio de Deuda/g,
	'<strong class="green-bold">$34,567 en Alivio de Deuda</strong>'
);

		// Make specific dollar amounts bold only in specific lines
		const specialAmounts = ["$16,800", "$16,800", "$16,800", "$16,800"];
		specialAmounts.forEach((amount) => {
				if (message.includes(amount)) {
						boldedMessage = boldedMessage.replace(
								amount,
								`<strong class="green-bold">${amount}</strong>`
						);
				}
		});

		// Show new toast
		toast(<div dangerouslySetInnerHTML={{ __html: boldedMessage }} />, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				closeButton: false,
		});
};

useEffect(() => {
		const delayedEffect = setTimeout(() => {
				// Create a function to handle the logic
				const showRandomToast = () => {
						const randomTime = 6000;
						const randomMessage =
								messages[Math.floor(Math.random() * messages.length)];
						notify(randomMessage);
						return randomTime;
				};
				
				// Show the first toast
				let nextTime = showRandomToast();

				// Set up a recurring timer
				const timer = setInterval(() => {
						nextTime = showRandomToast();
				}, nextTime);

				// Cleanup
				return () => {
						clearInterval(timer);
				};
		}, 6000); // 6-second delay before the useEffect code runs

		// Cleanup for the setTimeout
		return () => {
				clearTimeout(delayedEffect);
		};
}, []);

  useEffect(() => {
    stepProcess();
  }, [step]);

  const topScroll = (id: any) => {
    scrollTo({ id });
  };

  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "1. ¿Tienes Actualmente Más de $10,000 en Deudas?") {
      setQuiz(
        "2. ¿Sus Deudas Actuales son Relacionadas a Tarjetas de Crédito, Prestamos Personales o Facturas Médicas?"
      );
    } else {
      setStep("Revisando sus respuestas...");
      topScroll("top");
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives + 1,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
  const handleQuizN = () => {
    topScroll("btn");
    if (quiz === "1. ¿Tienes Actualmente Más de $10,000 en Deudas?") {
      setQuiz(
        "2. ¿Sus Deudas Actuales son Relacionadas a Tarjetas de Crédito, Prestamos Personales o Facturas Médicas?"
      );
    } else {
      setStep("Revisando sus respuestas...");
      topScroll("top");
    }
    setShowAdditionalDiv(true);
    // setTimeout(()=>{
        
    // },5000)
   
  };

  return (
    
    <div>
      <ToastContainer />
      <div className="top-sticky-blue" id="top">
        Emergency Relief Program
      </div>
      {step === "process" ? (
        <>
          <div className="main-container-5">
            <div className="main-descrition-5">
              {/* <div className='main-des-title-6'><b>Finalmente, los deudores están obteniendo hasta un<span style={{backgroundColor:"#fde047"}}> 100% de perdón financiero</span> bajo este programa respaldado por abogados, ¡Aquí está cómo!</b></div> */}
              <img className="topic-img-larger" src={Headline} alt="head" />
              <img className="topic-img-middle" src={Head_bg} alt="head" />
              <div className="main-des-5">
                Los estadounidenses con más de $10,000 en cuotas obtienen hasta
                un 100% de condonación financiera bajo este programa de ayuda de
                emergencia.
              </div>
              <div className="main-des-5" style={{ marginTop: "1rem" }}>
                <b>
                  La oportunidad de inscribirse en este programa finaliza esta
                  noche a las 9:00P.M.
                </b>
                , Verifica tu Elegibilidad Antes de que el Tiempo Acabe!
              </div>
              {/* <div className='main-des-5' style = {{marginTop:"1rem"}}><b>Simplemente responda las siguientes preguntas:</b></div> */}
            </div>
            <div className="survey">
              <div className="quiz-5" id="btn">
                {quiz}
              </div>
              <div className="answer">
                <div className="answer-btn-5" onClick={handleQuizP}>
                  Sí
                </div>
                <div className="answer-btn-5" onClick={handleQuizN}>
                  No
                </div>
              </div>
            </div>
          </div>
        </>
      ) : step !== "process" && step !== "completed" ? (
        <div className="checking" style={{ fontWeight: "700" }}>
          {step}
        </div>
      ) : (
       
        <div className="checking">
        {showAdditionalDiv ? (
          <>
           <div className="congrats">¡Felicitaciones, USTED CALIFICA!</div>
            <div className="top-description-5">
              ¡Haga una llamada rápida para reclamar su alivio de deuda de hasta el 100 % ahora!
            </div>
            <div className="spots-count">Lugares restantes: 4</div>
            <div className="tap-direction">👇TOCA ABAJO PARA LLAMAR👇</div>
            <a href="tel:+18315257761">
              <div className="call-btn" onClick={handleCall}>
             CALL (831) 5257-761
              </div>
            </a>
            <div className="sub-title">Nosotras hemos reservado tu lugar</div>
            <div className="sub-description">
              Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.
            </div>
            <div className="timer">
              <div className="timer-cell">{min}</div>
              <div className="timer-cell">:</div>
              <div className="timer-cell">{second}</div>
            </div>
          </>
        )}
      </div>
          </>
        ) : (
          <>
            <div className="congrats">¡Felicitaciones, USTED CALIFICA!</div>
            <div className="top-description-5">
              ¡Haga una llamada rápida para reclamar su alivio de deuda de hasta el 100 % ahora!
            </div>
            <div className="spots-count">Lugares restantes: 4</div>
            <div className="tap-direction">👇TOCA ABAJO PARA LLAMAR👇</div>
            <a href="tel:+18315257761">
              <div className="call-btn" onClick={handleCall}>
             CALL (831) 5257-761
              </div>
            </a>
            <div className="sub-title">Nosotras hemos reservado tu lugar</div>
            <div className="sub-description">
              Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.
            </div>
            <div className="timer">
              <div className="timer-cell">{min}</div>
              <div className="timer-cell">:</div>
              <div className="timer-cell">{second}</div>
            </div>
          </>
        )}
      </div>
       


      )}
      
       







      <div className="footer">
        <div className="terms">Terms & Conditions | Privacy Policy</div>
        <div className="copyright">
          Copyright © 2025 - All right reserved debtfreeamericatoday.org.
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
