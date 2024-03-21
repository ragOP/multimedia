import React, {useState, useEffect} from 'react';
//@ts-ignore
import TagManager from 'react-gtm-module'
import axios from "axios";
import './styles.scss'

import { scrollTo } from '../utils';

import Head_bg from '../assets/applesingh.png'
import Headline from '../assets/appleheading.png'

// google tag manager

const tagManagerArgs = {
    gtmId: 'GTM-KZJBC3B'
}

TagManager.initialize(tagManagerArgs)

export default function Fifth_SP() {

	useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora";

		axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
      .then(({ data }) => {
        if(data.length===0){
			const visits = {
				visits: 1,
				views: 0,
				calls: 0,
				positives: 0,
				negatives: 0,
			}

			axios
			.post(
				process.env.REACT_APP_PROXY + `/visits/create-visits8`,
				visits
			)
			.catch((err) =>
				console.log(err)
			);

		}else{
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			
			const visits = {
				visits: _visits+1,
				views: _views,
				calls: _calls,
				positives: _positives,
				negatives: _negatives,
			}
			axios
			.put(
				process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
				visits
			)
			.catch((err) =>
				console.log(err)
			);
				}
			})
		.catch((error) => {
			console.log(error);
		});

	}, [])

	const handleCall = () => {
		axios
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls+1,
				positives: _positives,
				negatives: _negatives,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}


	const [quiz, setQuiz] = useState("1. ¿Tienes Actualmente Más de $10,000 en Deudas?")
	const [step, setStep] = useState("process")
	const [min, setMin] = useState(3)
	const [second, setSecond] = useState<any>(0)    
	
	
	const stepProcess = () => {
		if(step==="Revisando sus respuestas..."){
			setTimeout(() => {
			  setStep("Coincidencia con las mejores opciones...")
			  }, 1500);
			}
		  if(step==="Coincidencia con las mejores opciones..."){
			setTimeout(() => {
			  setStep("Confirmando elegibilidad...")
			  }, 1500);
			}
		  if(step==="Confirmando elegibilidad..."){
			setTimeout(() => {
			  setStep("completed")

			  axios
				.get(process.env.REACT_APP_PROXY + `/visits/8`)
				.then(({ data }) => {
					const _id = data[0]._id
					const _visits = data[0].visits
					const _views = data[0].views
					const _calls = data[0].calls
					const _positives = data[0].positives
					const _negatives = data[0].negatives
					const visits = {
						visits: _visits,
						views: _views+1,
						calls: _calls,
						positives: _positives,
						negatives: _negatives,
					}
				axios
				.put(
					process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
					visits
				)
				.catch((err) =>
					console.log(err)
				);
			})
			  }, 1500);
			}
	  
		  if(step==="completed"){
			const startTime:any = new Date();
			const timer = setInterval(()=> {
			  const nowTime:any = new Date();
			  setSecond((180-Math.round((nowTime-startTime)/1000))%60)
			  setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
			}, 1000)
		}
	}

	useEffect(() => {
		stepProcess()
	}, [step])

	const topScroll = (id: any) => {
			scrollTo({ id });
		}

	const handleQuizP = () => {
		topScroll("btn");
		if(quiz === "1. ¿Tienes Actualmente Más de $10,000 en Deudas?"){
			setQuiz("2. ¿Sus Deudas Actuales son Relacionadas a Tarjetas de Crédito, Prestamos Personales o Facturas Médicas?")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives+1,
				negatives: _negatives,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

	const handleQuizN = () => {
		topScroll("btn");
		if(quiz === "1. ¿Tienes Actualmente Más de $10,000 en Deudas?"){
			setQuiz("2. ¿Sus Deudas Actuales son Relacionadas a Tarjetas de Crédito, Prestamos Personales o Facturas Médicas?")
		}else{
			setStep("Revisando sus respuestas...")
			topScroll("top");
		}

		axios
		.get(process.env.REACT_APP_PROXY + `/visits/8`)
		.then(({ data }) => {
			const _id = data[0]._id
			const _visits = data[0].visits
			const _views = data[0].views
			const _calls = data[0].calls
			const _positives = data[0].positives
			const _negatives = data[0].negatives
			const visits = {
				visits: _visits,
				views: _views,
				calls: _calls,
				positives: _positives,
				negatives: _negatives+1,
			}
		axios
		.put(
			process.env.REACT_APP_PROXY + `/visits/update-visits8/`+_id,
			visits
		)
		.catch((err) =>
			console.log(err)
		);
	  })
	}

    return(
        <div>
			<div className='top-sticky-blue' id='top'>Emergency Relief Program</div>
			{step==="process"?
				<>
					<div className='main-container-5'>
						<div className='main-descrition-5'>
							{/* <div className='main-des-title-6'><b>Finalmente, los deudores están obteniendo hasta un<span style={{backgroundColor:"#fde047"}}> 100% de perdón financiero</span> bajo este programa respaldado por abogados, ¡Aquí está cómo!</b></div> */}
							<img className='topic-img-larger' src = {Headline} alt = "head"/>
							<img className='topic-img-middle' src = {Head_bg} alt = "head"/>
							<div className='main-des-5'>Los estadounidenses con más de $10,000 en cuotas obtienen hasta un 100% de condonación financiera bajo este programa de ayuda de emergencia.</div>
							<div className='main-des-5' style = {{marginTop:"1rem"}}><b>La oportunidad de inscribirse en este programa finaliza esta noche a las 7:00P.M.</b>, Verifica tu Elegibilidad Antes de que el Tiempo Acabe!





</div>
							{/* <div className='main-des-5' style = {{marginTop:"1rem"}}><b>Simplemente responda las siguientes preguntas:</b></div> */}
						</div>
						<div className='survey'>
							<div className='quiz-5' id='btn'>{quiz}</div>
							<div className='answer'>
								<div className='answer-btn-5' onClick={handleQuizP}>Sí</div>
								<div className='answer-btn-5' onClick={handleQuizN}>No</div>
							</div>
						</div>
					</div>
				</>:
				(
				step!=="process" && step!=="completed"?
					<div className='checking' style={{fontWeight:"700"}}>
					{step}
					</div>:
					<div className='checking'>
						<div className='congrats'>¡Felicitaciones, USTED CALIFICA!</div>
						<div className='top-description-5'>¡Haga una llamada rápida para reclamar su alivio de deuda de hasta el 100 % ahora!</div>
						<div className='spots-count'>Lugares restantes: 4</div>
						<div className='tap-direction'>👇TOCA ABAJO PARA LLAMAR👇</div>
						<a href = "tel:+1(877)657-4615">
							<div className='call-btn' onClick={handleCall}>
							CALL (877) 657-4615
							</div>
						</a>
						<div className='sub-title'>Nosotras hemos reservado tu lugar</div>
						<div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.</div>
						<div className='timer'>
							<div className='timer-cell'>{min}</div>
							<div className='timer-cell'>:</div>
							<div className='timer-cell'>{second}</div>
						</div>
					</div>
				)
			}
			<div className='footer'>
				<div className='terms'>Terms & Conditions | Privacy Policy</div>
				<div className='copyright'>Copyright © 2022 - All right reserved Daily America Savings.</div>
			</div>
		</div>
    )
} 
