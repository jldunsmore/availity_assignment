import React from 'react';
import { CSVReader } from 'react-papaparse';

import './enrollment.css';

const buttonRef = React.createRef();

export default class EnrollmentFiles extends React.Component{
      constructor(props) {
        super(props);
        this.state = {parsedData: []};
      }
      
      handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.open(e);
        }
      };
    
      // duplicate user ids with different versions
      // 461tl
      // 902ii
      // 305wb
      // 075ax
      handleOnFileLoad = (data) => {
        console.log('---------------------------');
        const users = data.filter((user) => {if (user.data[0] !== "id" && user.data[0] !=="") return true; else return false;})
                          .map((user) => {
            const userData = {
              id: user.data[0],
              userId: user.data[1],
              fullName: user.data[2],
              version: parseInt(user.data[3]),
              insuranceCompany: user.data[4]};
            return userData; 
        }, []);
        const groupBy = (array, key) => {
          return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
          }, {});
        }
        let companys = groupBy(users, 'insuranceCompany');
        Object.values(companys).forEach(company => {
          company.sort((a,b) => {
            const firstNameA = a.fullName.split(' ').slice(0, -1).join(' ');
            const lastNameA = a.fullName.split(' ').slice(-1).join(' ');
            
            const firstNameB = b.fullName.split(' ').slice(0, -1).join(' ');
            const lastNameB = b.fullName.split(' ').slice(-1).join(' ');

            return ((firstNameA < firstNameB) ? -1 : (lastNameA < lastNameB) ? 1 : 0);
          });
        });
        
        let newCompanyList = [];
        Object.values(companys).forEach(company => {
          const duplicateIds = company.map(e => e['userId'])
                                  .map((e, i, final) => final.indexOf(e) !== i && i)
                                  .filter(obj=> company[obj])
                                  .map(e => company[e]["userId"]);
          duplicateIds.forEach((userId) => {
            const heighestVersion = company.filter(c => c.userId === userId)
                                       .reduce((prev, current) => { return (prev.version > current.version) ? prev : current});
            const removeUser = company.filter(c => c.userId === heighestVersion.userId && c.id !== heighestVersion.id);
            const newCompany = company.filter((e) => !removeUser.find(r => e.id === r.id));
            if(!newCompanyList.find(list => list[0].insuranceCompany === newCompany[0].insuranceCompany)) {
              newCompanyList.push(newCompany);
            }
          })
        });
        this.setState({parsedData: newCompanyList});
        console.log(this.state.parsedData);
        console.log('---------------------------');
      };
    
      handleOnError = (err, file, inputElem, reason) => {
        console.log('---------------------------');
        console.log(err);
        console.log('---------------------------');
      };
    
      handleOnRemoveFile = (data) => {
        console.log('---------------------------');
        console.log(data);
        console.log('---------------------------');
      };
    
      handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e);
        }
      };

      handleFileDownLoadClick(event) {

        const userList = event.target.value;
        const company = event.target.id;
        
        const hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(userList);
        hiddenElement.target = '_blank';
        hiddenElement.download = company.toLowerCase().replace(" ", "") + '.csv';
        hiddenElement.click();

      }
    
      render() {
        return (
          <div>
            <CSVReader
              ref={buttonRef}
              onFileLoad={this.handleOnFileLoad}
              onError={this.handleOnError}
              noClick
              noDrag
              onRemoveFile={this.handleOnRemoveFile}
            >
              {({ file }) => (
                <aside className="file-upload-container"  >
                  <button className="file-selection"
                    type="button"
                    onClick={this.handleOpenDialog} >
                    Browse file
                  </button>
                  <div className="file-upload">
                    {file && file.name}
                  </div>
                  <button className="remove-file" onClick={this.handleRemoveFile}>Clear File</button>
                </aside>
              )}
            </CSVReader>
            <div className="links">
              {                                
                this.state.parsedData.map(company => {
                  const companyName = company[0].insuranceCompany;

                  let csv = '';
                  let header = Object.keys(company[0]).join(',');
                  let values = company.map(o => Object.values(o).join(',')).join('\n');

                  csv += header + '\n' + values;
                  return <div><button key="{companyName}" value={csv} id={companyName} onClick={this.handleFileDownLoadClick}>{companyName}</button></div>;
                })
              }
            </div>
          </div>
        );
      }
}