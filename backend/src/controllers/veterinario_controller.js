import Veterinario from "../models/Veterinario.js"

const async registro = (req, res) => {
    try {
        // Paso 1
        const { email, password } = req.body
        // Paso 2
        if (Object.values(req.body).includes("")) return res.status(400).json({
            msg: "Lo sentimos, debes llenar todos los campos"
        })

        const verificarEmailDB = await Veterinario.findOne({ email })

        if (verificarEmailDB) return res.status(400).json({
            msg: "Lo sentimos, el email ya se encuentra registrado"
        })
        // Paso 3
        const nuevoVeterinario = new Veterinario(req.body)

        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password)
        await nuevoVeterinario.save()
        // Paso 4
        res.status(201).json({
            msg: "Registro exitoso"
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    registro
}
