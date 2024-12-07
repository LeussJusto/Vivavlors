import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/iniciocss.css';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function HomePage() {
    return (
        <div>
            {/* Menú de navegación */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Viba Colors</a>
                    <img src="img-vid/Logo Viba Color.jpg" alt="Logo" className="brand-logo" />

                    {/* Botón de login alineado a la derecha usando Link */}
                    <div className="d-flex ms-auto">
                        <Link to="/login">
                            <button className="btn btn-outline-primary" id="loginBtn">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <style jsx>{`
        /* Estilo personalizado para el botón de Login */
        #loginBtn {
          font-size: 1rem;  /* Tamaño del texto */
          padding: 8px 15px;  /* Tamaño del botón */
          border-radius: 5px;  /* Bordes redondeados */
          border: 2px solid #007bff;  /* Borde azul */
        }

        #loginBtn:hover {
          background-color: #007bff;  /* Fondo azul al pasar el mouse */
          color: white;  /* Color blanco del texto */
        }

        /* Aseguramos que el botón esté alineado a la derecha */
        .container-fluid {
          position: relative;
        }

        .d-flex {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>

            {/* Sección 1: INICIO */}
            <section id="inicio" className="text-center py-5 bg-light">
                <div className="container">
                    <h1 className="text-black my-4 display-3">Bienvenido a Viba Colors</h1>
                    <p className="text-black my-4">Tu mejor opción en matizado de colores</p>
                    {/* Botón para modal */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#videoModal">
                        Ver Video de Presentación
                    </button>
                </div>
            </section>

            {/* Modal de Video */}
            <div className="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="videoModalLabel">Presentación Viba Colors</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <video controls className="w-100">
                                <source src="video.mp4" type="video/mp4" />
                                Tu navegador no soporta video.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección 2: NEGOCIOS */}
            <section id="negocios" className="py-5">
                <div className="container">
                    <h2 className="text-center">Negocios</h2>
                    <p className="text-center">Descubre cómo nuestros productos ayudan a restaurar tus vehículos</p>
                    {/* Imágenes con Flexbox */}
                    <div className="flex-container">
                        <img src="img-vid/Matizado1.png" alt="Imagen Negocios 1" className="img-fluid" style={{ width: '300px' }} />
                        <img src="img-vid/Matizado2.jpg" alt="Imagen Negocios 2" className="img-fluid" style={{ width: '300px' }} />
                        <img src="img-vid/Matizado3.jpg" alt="Imagen Negocios 3" className="img-fluid" style={{ width: '300px' }} />
                    </div>

                    {/* Formulario */}
                    <div className="mt-5">
                        <h3>Contáctanos</h3>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido</label>
                                        <input type="text" className="form-control" id="apellido" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input type="email" className="form-control" id="correo" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" id="telefono" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripción</label>
                                <textarea className="form-control" id="descripcion" rows="3"></textarea>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="acepto" />
                                <label className="form-check-label" htmlFor="acepto">Acepto términos y condiciones</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Sección 3: PARA TI */}
            <section id="para-ti" className="py-5 bg-light">
                <div className="container text-center">
                    <h2>Para Ti</h2>
                    <p>Conoce cómo podemos ayudarte a lograr el mejor matizado.</p>
                    <img src="img-vid/mezclado.jpg" alt="Imagen Principal" className="img-fluid mb-4" />
                    <div className="row">
                        <div className="col-md-3">
                            <img src="/img-vid/pintar-coche-2.jpg" alt="Imagen 1" className="img-fluid" />
                        </div>
                        <div className="col-md-3">
                            <img src="/img-vid/depositphotos.jpg" alt="Imagen 2" className="img-fluid" />
                        </div>
                        <div className="col-md-3">
                            <img src="img-vid/Recubrimientos.png" alt="Imagen 3" className="img-fluid" />
                        </div>
                        <div className="col-md-3">
                            <img src="img-vid/Pintor02a.jpg" alt="Imagen 4" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección 4: PREGUNTAS */}
            <section id="preguntas" className="py-5">
                <div className="container">
                    <h2 className="text-center">Preguntas Frecuentes</h2>
                    <p className="text-center">Encuentra las respuestas a las preguntas más comunes.</p>
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h3 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    ¿Cómo funciona el matizado?
                                </button>
                            </h3>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body">
                                    El matizado consiste en la mezcla de colores según el gusto del cliente para lograr el tono deseado.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección 5: DESCARGA */}
            <section id="descarga" className="py-5 bg-light">
                <div className="container text-center">
                    <h2>Descarga Nuestro Catálogo</h2>
                    <p>Obtén toda la información en un solo clic</p>
                    <a href="#" className="btn btn-primary">Descargar PDF</a>
                </div>
            </section>

            <footer class="text-center py-4 bg-dark text-white">
                <p>&copy; 2024 Viba Colors. Todos los derechos reservados.</p>
            </footer>

            <a href="https://wa.me/1234567890" class="whatsapp-button" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
        </div>
    );
}

export default HomePage;
