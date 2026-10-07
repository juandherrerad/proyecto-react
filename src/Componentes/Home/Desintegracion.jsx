import { useEffect, useRef, useState } from 'react'

export default function Desintegracion({
    src,
    retraso = 1500,
    duracion = 3000,
    paso = 3,
    onFin,
    onInicio,
}) {
    const canvasRef = useRef(null)
    const imgRef = useRef(null)
    const onFinRef = useRef(onFin)
    const onInicioRef = useRef(onInicio)
    const [fase, setFase] = useState('mostrando') // mostrando (gif animado) -> desintegrando
    const [prevSrc, setPrevSrc] = useState(src)
    if (prevSrc !== src) {
        setPrevSrc(src)
        setFase('mostrando')
    }

    useEffect(() => {
        onFinRef.current = onFin
        onInicioRef.current = onInicio
    }, [onFin, onInicio])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        const img = new Image()
        let raf
        let timeoutId
        let cancelado = false

        const animar = (particulas) => {
            const inicio = performance.now()
            const total = 1.3

            const cuadro = (ahora) => {
                if (cancelado) return
                const t = ((ahora - inicio) / duracion) * total
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                for (const p of particulas) {
                    const local = (t - p.delay) / 0.4
                    if (local >= 1) continue
                    const k = Math.max(local, 0)
                    ctx.globalAlpha = 1 - k
                    ctx.fillStyle = p.color
                    ctx.fillRect(p.x + p.vx * k, p.y + p.vy * k, paso, paso)
                }
                ctx.globalAlpha = 1

                if (t < total) {
                    raf = requestAnimationFrame(cuadro)
                } else {
                    onFinRef.current?.()
                }
            }
            raf = requestAnimationFrame(cuadro)
        }

        img.onload = () => {
            if (cancelado) return
            const escala = Math.min(1, 400 / img.naturalWidth)
            canvas.width = Math.round(img.naturalWidth * escala)
            canvas.height = Math.round(img.naturalHeight * escala)
            // Prepara partículas desde el primer cuadro (canvas dibuja GIF estático,
            // por eso durante 'mostrando' se ve el <img> animado y el canvas oculto)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const particulas = []
            for (let y = 0; y < canvas.height; y += paso) {
                for (let x = 0; x < canvas.width; x += paso) {
                    const i = (y * canvas.width + x) * 4
                    if (data[i + 3] < 10) continue // píxel transparente
                    particulas.push({
                        x,
                        y,
                        color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
                        delay: (x / canvas.width) * 0.6 + Math.random() * 0.3,
                        vx: 40 + Math.random() * 120,
                        vy: -(20 + Math.random() * 100),
                    })
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            timeoutId = setTimeout(() => {
                if (cancelado) return
                // Captura el cuadro visible del <img> (último del GIF) ANTES de
                // desmontarlo, para que la desintegración parta sin salto visual
                const visible = imgRef.current
                try {
                    if (visible && visible.naturalWidth) {
                        ctx.drawImage(visible, 0, 0, canvas.width, canvas.height)
                        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
                        particulas.length = 0
                        for (let y = 0; y < canvas.height; y += paso) {
                            for (let x = 0; x < canvas.width; x += paso) {
                                const i = (y * canvas.width + x) * 4
                                if (data[i + 3] < 10) continue
                                particulas.push({
                                    x,
                                    y,
                                    color: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
                                    delay: (x / canvas.width) * 0.6 + Math.random() * 0.3,
                                    vx: 40 + Math.random() * 120,
                                    vy: -(20 + Math.random() * 100),
                                })
                            }
                        }
                    } else {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    }
                } catch {
                    // Si el canvas se contamina, usa las partículas iniciales
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                }
                setFase('desintegrando')
                onInicioRef.current?.()
                requestAnimationFrame(() => animar(particulas))
            }, retraso)
        }
        img.src = src

        return () => {
            cancelado = true
            clearTimeout(timeoutId)
            cancelAnimationFrame(raf)
        }
    }, [src, retraso, duracion, paso])

    return (
        <div style={{ display: 'inline-block', lineHeight: 0 }}>
            {fase === 'mostrando' && (
                <img ref={imgRef} src={src} alt="" style={{ maxWidth: '400px', width: '100%', height: 'auto', display: 'block' }} />
            )}
            <canvas ref={canvasRef} style={{ display: fase === 'mostrando' ? 'none' : 'block', maxWidth: '400px', width: '100%', height: 'auto' }} />
        </div>
    )
}
