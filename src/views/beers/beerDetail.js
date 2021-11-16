import React, { useState } from 'react';
import styled from "styled-components";
import Select from 'react-select';
import Uploady, {
    useItemStartListener,
    useItemFinalizeListener,
    useItemFinishListener
  } from "@rpldy/uploady";
  import { getMockSenderEnhancer } from "@rpldy/mock-sender";
  import UploadDropZone from "@rpldy/upload-drop-zone";
  import withPasteUpload from "@rpldy/upload-paste";
  import UploadPreview from "@rpldy/upload-preview";
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
    Label,
    Row,
    Col
  } from "reactstrap";
  

const mockSenderEnhancer = getMockSenderEnhancer();

const PreviewContainer = styled.div`
  margin-top: 20px;

  img {
    max-width: 200px;
  }
`;


const StyledDropZone = styled(UploadDropZone)`
  width: 400px;
  height: 200px;
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 22px;
  font-size: 20px;
  margin: 10px 0;
`;

const PasteUploadDropZone = withPasteUpload(StyledDropZone);

const PasteInput = withPasteUpload(StyledInput);

const UploadStatus = (moreProps) => {
  const [status, setStatus] = useState(null);

  useItemStartListener(() => setStatus("Uploading..."));
  useItemFinalizeListener(() => setStatus("Finished!"));

  useItemFinishListener((item) => {
      moreProps.extraProps.source.logo=item.file;
      console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse, item.uploadStatus);  
  });
  return status;
};



class BeerDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            beer:props.beer
        }
    }

    cancelDetail = () => {
        this.props.cancelDetail(this.props.beer,"cancel");
    }

    handleChangeInput = (value, propName) => {
        let newState = Object.assign({}, this.state);
        newState.beer[propName] = value;
        this.setState(newState);
    }

    handleInputChange = (event, inputPropName) => {
        const newState = Object.assign({}, this.state);
        if (event.target) {
            newState.beer[inputPropName] = event.target.value;
        }
        this.setState(newState);
    }

    UpdateBeerDetail=()=>{
        console.log(this.state.beer);
        this.props.cancelDetail(this.state.beer, "insert");
    }

    render(){
        return(
            <>
            <Row>
                <Col md="4" sm="12" lg="4">
                    <Label> Beer Name</Label>
                    <Input value={this.state.beer.name} size="sm" type="text" onChange={(e) => this.handleChangeInput(e.target.value,'name')} autoComplete="new-name" />
                </Col>
                <Col md="4" sm="12" lg="4">
                    <Label>Company Name</Label>
                    <Input value={this.state.beer.companyName} size="sm" type="text" onChange={(e) => this.handleChangeInput(e.target.value,'companyName')} autoComplete="new-name" />
                </Col>
                <Col md="4" sm="12" lg="4">
                    <Label>Type</Label>
                    <Select size="sm" options={this.state.beer.beerTypes}></Select>
                </Col>
            </Row>
            <Row>
                <Col md="6" sm="12" lg="6">
                    <Uploady debug enhancer={mockSenderEnhancer} destination={{ url: "http://localhost:3000/upload" }}>
                        {/* <PasteUploadDropZone params={{ test: "paste" }}>
                        You can drop a file here
                        <br />
                        OR
                        <br />
                        click and paste a file to upload
                        </PasteUploadDropZone> */}
                        <PasteInput extraProps={{ placeholder: "paste inside to upload" }} />
                        <UploadStatus extraProps={{source:this.state.beer}} />
                        <PreviewContainer>
                        <UploadPreview  />
                        </PreviewContainer>
                    </Uploady>
                </Col>
            </Row>
            <div>
                    <button onClick={this.UpdateBeerDetail}>Update</button>
                    <button onClick={this.cancelDetail}>Cancel</button>
            </div>
            </>
        )
    }
}

export default BeerDetail;