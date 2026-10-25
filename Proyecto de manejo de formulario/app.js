import { z } from "https://esm.sh/zod";

function limpiarCampos(){
      document.querySelector("#error-nombre").textContent = "";
      document.querySelector("#error-correo").textContent = "";
      document.querySelector("#error-telefono").textContent = "";
      document.querySelector("#error-intereses").textContent = "";
      document.querySelector("#error-fecha").textContent = "";
      document.querySelector("#error-horario").textContent = "";
      document.querySelector("#error-hora").textContent = "";
}



document.getElementById('registroEvento').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío automático del formulario
      
      //Limpiando campos
      limpiarCampos();


      const datos = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        intereses: document.querySelectorAll('input[name="intereses"]:checked').length,
        fecha: document.getElementById('fecha').value,
        horario: document.querySelector('input[name="horario"]:checked')?.value,
        hora: document.getElementById('hora').value
      }

      
      const esquemaUsuario = z.object({
        nombre: z.string()
                .min(3, "El nombre debe de tener al menos 3 caracteres"),

        correo: z.string()
                .trim()
                .email("Escribe un correo válido"),

        telefono: z.string()
                  .regex(/^\d{10}$/, "El teléfono debe contener exactamente 10 dígitos"),

        intereses: z.number()
                   .min(1, "Debes seleccionar al menos un interés"),

        horario: z.string("Debes de seleccionar un horario"),

        fecha: z.string("Seleccione una fecha")
               .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido (YYYY-MM-DD)"),

        hora: z.string()
              .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Ingresa una hora válida (HH:mm)")
        
      });
      
      const resultado = esquemaUsuario.safeParse(datos);

      console.log(datos.horario)

      
      if(!resultado.success){
        for(const error of resultado.error.issues){
          const campo = error.path[0];

          document.querySelector(
            `#error-${campo}`
          ).textContent = error.message

        }
        return;
      }
      
      
     
      
    

      // Si todo está bien
      alert('Registro exitoso. ¡Gracias por registrarte!');
      limpiarCampos()
       this.reset();
    });