import React, { useState } from 'react';
import { useFetchAllcode } from '../../../util/fetch';

const LeftBar = (props) => {
    const { data: dataJobType } = useFetchAllcode('JOBTYPE');
    const { data: dataJobLevel } = useFetchAllcode('JOBLEVEL');
    const { data: dataSalaryType } = useFetchAllcode('SALARYTYPE');
    const { data: dataExpType } = useFetchAllcode('EXPTYPE');
    const { data: dataWorkType } = useFetchAllcode('WORKTYPE');
    const { data: dataJobLocation } = useFetchAllcode('PROVINCE');

    return (
        <div className="flex flex-wrap gap-4">
{
    <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
            <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                onChange={(e) => props.recieveJobType(e.target.value)}
                    >
                        <option value="">Job</option>
                        {dataJobType.map((data, index) => (
                            <option value={data.code} key={index}>
                                {data.value}
                            </option>
                        ))}
                    </select>
         </div>
}
    {
        <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
            <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                onChange={(e) => props.worktype(e.target.value)}
            >
                        <option value="">Working form</option>
                {dataWorkType.map((data, index) => (
                    <option value={data.code} key={index}>
                        {data.value}
                    </option>
                ))}
                    </select>
         </div>
    }
            {
                <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
                    <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                        onChange={(e) => props.recieveLocation(e.target.value)}
                    >
                        <option value="">Location</option>
                        {dataJobLocation.map((data, index) => (
                            <option value={data.code} key={index}>
                                {data.value}
                            </option>
                        ))}
                    </select>
                </div>
            }
            {
                <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
                    <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                        onChange={(e) => props.recieveExp(e.target.value)}
                    >
                        <option value="">Experience</option>
                        {dataExpType.map((data, index) => (
                            <option value={data.code} key={index}>
                                {data.value}
                            </option>
                        ))}
                    </select>
                </div>
            }
            {
                <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
                    <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                        onChange={(e) => props.recieveJobLevel(e.target.value)}
                    >
                        <option value="">Rank</option>
                        {dataJobLevel.map((data, index) => (
                            <option value={data.code} key={index}>
                                {data.value}
                            </option>
                        ))}
                    </select>
                </div>
            }
            {
                <div className="bg-gray-200 pr-4 rounded-md flex-1 min-w-[200px]">
                    <select             className="rounded-md focus:outline-none bg-transparent px-5 py-2 w-full"

                                        onChange={(e) => props.recieveSalary(e.target.value)}
                    >
                        <option value="">Salary</option>
                        {dataSalaryType.map((data, index) => (
                            <option value={data.code} key={index}>
                                {data.value}
                            </option>
                        ))}
                    </select>
                </div>
            }

</div>
    );
};

export default LeftBar;
