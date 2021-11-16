import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import BeerDetail from './beerDetail';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
  } from "reactstrap";

class BeerList extends React.Component{
    constructor(){
        super()
        this.state={
            beers:[],
            expanded:[],
            beerTypes:[{value:1,label:'Beer'}],
            showList:true
        }
    }

    componentDidMount(){
        // Load the list
    }

    addBeer = () => {
        let newState = Object.assign({}, this.state);
        let beers = newState.beers.filter(c => c.id === 0);
        if (beers.length != 0) {
            newState.beers.splice(beers[0], 1);
        }
        newState.beers.splice(0, 0, { id: 0, name: '', companyName: '',beerTypes:this.state.beerTypes,type:'Beer',logo:null });
        newState.expanded = [0];
        this.setState(newState);
    }

    cancelDetail = (beerData, command) => {
        let newState = Object.assign({}, this.state);
        newState.expanded = [];
        if (beerData) {
            if (command === "update" || command === "cancel") {
                let updateBeer = newState.beers.filter(c => c.id === beerData.id);
                if (updateBeer.length !== 0) {
                    updateBeer[0].id = beerData.id;
                    updateBeer[0].name = beerData.name;
                    updateBeer[0].companyName = beerData.companyName;
                }
            }
            else {
                //newState.stories.splice(0, 0, storyData);
                newState.beers.push(beerData);
            }
        }
        let beers = newState.beers.filter(c => c.id === 0);
        if (beers.length !== 0) {
            newState.beers.splice(beers[0], 1);
        }
        this.setState(newState);
    }

    customDelete = (row) => {
        let confirmDelete = window.confirm('Are you sure?');
        if (!confirmDelete) return;
        let beers = this.state.beers;
        let selectedItem = beers.filter(c => c.id === row.id);
        if (selectedItem.length !== 0) {
            beers.splice(beers.indexOf(selectedItem[0].id), 1);
        }
        let newState = Object.assign({}, this.state);
        newState.beers = beers;
        this.setState(newState);
    }

    render(){
        const expandRow = {
            showExpandColumn: true,
            expandByColumnOnly: true,
            onlyOneExpanding: true,
            expanded: this.state.expanded,
            renderer: (row) => {
                return (
                    <BeerDetail beer={row} cancelDetail={this.cancelDetail} />
                )
            }
        };

        const  columns = [
            {
                dataField: 'id',
                text: 'BeerId',
                hidden: true
            },{
                dataField: 'name',
                text: 'Beer Name',
                sort: true,
            }, {
                dataField: 'companyName',
                text: 'Company Name',
                sort: true
            }, {
                dataField: 'type',
                text: 'Beer Type',
                sort: true
            }, {
                text: 'Manage',
                sort: false,
                isDummyField: true,
                editable: false,
                formatter: (cellContent, row) => {
                    return (<button onClick={()=>this.customDelete(row)}>Delete</button>);
                }
            }

        ]

        return(
            <React.Fragment>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent py-3 border-0">
                        <Row className="mb-4">
                        <Col lg="6" md="6" sm="12">
                            <Row>
                            <Col lg="8" md="8">
                                <h4>Beers</h4>
                            </Col>
                            </Row>
                        </Col>
                        <Col md="6" lg="6">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="mr-5">
                                    <Button className="btn btn-outline-default btn-sm" onClick={this.addBeer}><i className="fa fa-plus" aria-hidden="true"></i> &nbsp; Add Beer </Button>
                                </div>
                            </div>
                        </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Row> 
                                        <Col lg="12" m="12">
                            {this.state.showList === true ? 
                                <BootstrapTable classes="custom-table-css" striped hover condensed
                                                        keyField='id'
                                                        data={this.state.beers}
                                                        columns={columns}
                                                        expandRow={expandRow}
                                /> : this.state.showList === false ? 'No Stories' : ''}
                            </Col>
                        </Row>

                    </CardBody>
                    </Card>
                
        </React.Fragment>
        )
    }
}

export default BeerList;

