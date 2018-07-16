import React, { Component, Fragment } from "react";
import PrizeWheel from "prize-wheel";
import { filter, cloneDeep } from "lodash";

class Personas extends Component {
  constructor(props) {
    super(props);

    const settings = {
      el: "#wheel2", // Canvas ID
      members: [
        "Stevenson",
        "Nil",
        "Pablo",
        "Lazo",
        "Enzo",
        "Lucian",
        "Sapito",
        "Melita"
      ], // Array of members
      colors: [
        "#C7181D",
        "#FCB937",
        "#A1B836",
        "#371979",
        "#C7181D",
        "#FCB937",
        "#A1B836",
        "#371979"
      ], // Background color of each member
      radius: 250 // wheel radius
    };

    this.state = {
      settings
    };
  }

  configWheel() {
    this.wheel = new PrizeWheel(this.state.settings);
    this.wheel.init();
  }

  componentDidMount() {
    this.configWheel();
  }

  render() {
    const { settings } = this.state;
    return (
      <div>
        <canvas id="wheel2" />
        <button
          onClick={() => {
            this.wheel.spin(async member => {
              alert(`Le toca asignacion de pieza a: ${member}`);
              const aux = cloneDeep(settings);
              aux.members = filter(aux.members, val => val !== member);

              await this.setState({
                settings: aux
              });
              this.configWheel();
              this.props.onChange(member);
            });
          }}
        >
          RULETA DE PERSONAS
        </button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    const settings = {
      el: "#wheel", // Canvas ID
      members: [
        "1 - Matrimonial",
        "2 - Matrimonial",
        "3 - Individual Pieza 1",
        "4 - Individual Pieza 2",
        "5 - Individual Pieza 2",
        "6 - Litera Abajo Pieza 2",
        "7 - Litera Abajo Pieza 2",
        "8 - Litera Arriba Pieza 2"
      ], // Array of members
      colors: [
        "#C7181D",
        "#FCB937",
        "#A1B836",
        "#371979",
        "#C7181D",
        "#FCB937",
        "#A1B836",
        "#371979"
      ], // Background color of each member
      radius: 250 // wheel radius
    };

    this.state = {
      settings,
      name: ""
    };
  }

  configWheel() {
    this.wheel = new PrizeWheel(this.state.settings);
    this.wheel.init();
  }

  componentDidMount() {
    this.configWheel();
  }

  render() {
    const { name, settings } = this.state;
    return (
      <div className="App">
        {name !== "" ? (
          <Fragment>
            <input value={name} />
            <button
              onClick={() => {
                this.wheel.spin(async member => {
                  alert(`${name} ha obtenido la pieza: ${member}`);
                  const aux = cloneDeep(settings);
                  aux.members = filter(aux.members, val => val !== member);

                  await this.setState({
                    settings: aux,
                    name: ""
                  });
                  this.configWheel();
                });
              }}
            >
              RULETA SELECCION DE PIEZA
            </button>
          </Fragment>
        ) : null}

        <Personas onChange={name => this.setState({ name })} />

        <canvas id="wheel" />
      </div>
    );
  }
}

export default App;
