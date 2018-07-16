import React, { Component, Fragment } from "react";
import PrizeWheel from "prize-wheel";
import { filter, cloneDeep, shuffle, concat, map } from "lodash";

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
      settings,
      visible: true
    };
  }

  async shuffleWheel() {
    const aux = cloneDeep(this.state.settings);
    aux.members = shuffle(aux.members);
    await this.setState({
      settings: aux
    });
    this.configWheel();
  }

  configWheel() {
    this.wheel = new PrizeWheel(this.state.settings);
    this.wheel.init();
  }

  componentDidMount() {
    this.configWheel();
  }

  render() {
    const { settings, visible } = this.state;
    return (
      <div>
        <canvas id="wheel2" />
        {visible && this.props.name === "" ? (
          <Fragment>
            <button
              onClick={() => {
                this.setState({ visible: false });
                this.wheel.spin(async member => {
                  alert(`Le toca asignacion de pieza a: ${member}`);
                  const aux = cloneDeep(settings);
                  aux.members = filter(aux.members, val => val !== member);

                  await this.setState({
                    settings: aux,
                    visible: true
                  });
                  this.configWheel();
                  this.props.onChange(member);
                });
              }}
            >
              GIRAR RULETA DE PERSONAS
            </button>
            <button onClick={() => this.shuffleWheel()}>
              BARAJAR PERSONAS
            </button>
          </Fragment>
        ) : null}
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
      name: "",
      visible: true,
      list: []
    };
  }

  async shuffleWheel() {
    const aux = cloneDeep(this.state.settings);
    aux.members = shuffle(aux.members);
    await this.setState({
      settings: aux
    });
    this.configWheel();
  }

  configWheel() {
    this.wheel = new PrizeWheel(this.state.settings);
    this.wheel.init();
  }

  componentDidMount() {
    this.configWheel();
  }

  render() {
    const { name, settings, visible, list } = this.state;
    return (
      <div className="App">
        {visible && name !== "" ? (
          <Fragment>
            <input value={name} />
            <button
              onClick={() => {
                this.setState({ visible: false });
                this.wheel.spin(async member => {
                  const str = `${name} ha obtenido la pieza: ${member}`;
                  this.setState({ list: concat(list, str) });
                  alert(str);
                  const aux = cloneDeep(settings);
                  aux.members = filter(aux.members, val => val !== member);

                  await this.setState({
                    settings: aux,
                    name: "",
                    visible: true
                  });
                  this.configWheel();
                });
              }}
            >
              GIRAR RULETA DE SELECCION DE PIEZA
            </button>
            <button onClick={() => this.shuffleWheel()}>BARAJAR PIEZAS</button>
          </Fragment>
        ) : null}

        <Personas name={name} onChange={name => this.setState({ name })} />

        <canvas id="wheel" />

        <ul style={{ listStyleType: "circle" }}>
          {map(list, val => <li>{val}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
