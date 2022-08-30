
 const llamarServicio = async(monedaseleccionada) => {
    console.log('llamarServicio');
    const respuestaServicio = await fetch(`https://mindicador.cl/api/${monedaseleccionada}`)
    .then(res => res.json())
    .then(res => res);
    console.log(respuestaServicio);
    return respuestaServicio;
 };

 const calcularPesos = (resultadoApi, valorAgregado) => {
    console.log('calcularPesos');
    console.log(resultadoApi.serie[0].valor);
    console.log(valorAgregado);
    const moneda = resultadoApi.serie[0].valor;

    return valorAgregado / moneda;
 }

 const cargarGrafico = (resultadoApi) => {

    let valor = resultadoApi.serie.map( dia => dia.valor);
    let fecha = resultadoApi.serie.map( dia => dia.fecha.substring(0, 10));
    valor = valor.splice(0, 10);
    fecha = fecha.splice(0, 10);
    valor = valor.reverse();
    fecha = fecha.reverse();
    console.log(valor)
    var options = {
        chart: {
          type: 'line'
        },
        series: [{
          name: resultadoApi.nombre,
          data: valor
        }],
        xaxis: {
          categories: fecha
        }
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();
 }

const btn = document.getElementById('btnbuscar');
btn.addEventListener('click' , async() => {
    console.log('hice click');
    const valorAgregado = document.getElementById('tarea').value;
    const monedaseleccionada = document.getElementById('monedaseleccionada').value;
    console.log(monedaseleccionada)
    console.log(valorAgregado)

 // ir a la api
    const resultadoApi = await llamarServicio(monedaseleccionada);
    const resultadoCalculo = calcularPesos(resultadoApi, valorAgregado);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = resultadoCalculo


    console.log(resultadoCalculo);
    cargarGrafico(resultadoApi);
})

