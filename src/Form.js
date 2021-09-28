import { Formik, Form, Field} from 'formik'
import React, { useState } from 'react'
import emailjs from 'emailjs-com';

export const Formulario = () => {

    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('gmailMessage', 'template_i1y56c7', e.target, 'user_UNxzHdhnF4TkUjL5Ck7fd')
          .then((valores) => {
            cambiarFormularioEnviado (true)
          }, (error) => {
            alert('mal')
          });
          e.target.reset();
      };
    
    return (
        <div className="main">
            <Formik
                initialValues={{
                    nombre:'',
                    correo:'',
                    comentario:''
                }}

                validate={(valores) => {
                    let errores = {};
                    if(!valores.nombre){
                        errores.nombre = 'Ingresá un nombre'
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                        errores.nombre='Colocá caracteres correctos. Letras y espacios :)'
                    }
                    if(!valores.correo){
                        errores.correo = 'Ingresá un correo'
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                        errores.correo='Ingresá un correo electrónico válido'
                    }                   
                    return errores;
                }}

                onSubmit={() =>{
                    cambiarFormularioEnviado (true)
                }}
            >
               
               {({touched, handleBlur, errors, handleChange, values, handleSubmit}) =>(
    <Form className="formulario" onSubmit={sendEmail}>
        <label htmlFor="nombre">Nombre y Apellido</label>
            <input  
                required
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Ingresa tu nombre completo" 
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
        <label htmlFor="correo">Email</label>
            <input 
                required
                type="mail" 
                id="correo" 
                name="correo" 
                placeholder="mail@mail.com" 
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.correo && errors.correo && <div className="error">{errors.correo}</div>}
        <label htmlFor="comentario">Comentario</label>
            <Field
                as="textarea"
                id="comentario" 
                name="comentario" 
                value={values.comentario}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        <button type="submit">Enviar</button>
        {formularioEnviado &&<p className="exito">¡Enviaste el formulario correctamente!</p>}
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}

