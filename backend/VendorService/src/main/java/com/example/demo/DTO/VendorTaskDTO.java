package com.example.demo.DTO;



import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class VendorTaskDTO {
    private String taskTitle;
    private String requirementTitle;
    private String clientName;
    private Date deadline;
    private String status;
}
