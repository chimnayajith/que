package com.que.que.controller;

import com.que.que.dto.*;
import com.que.que.model.QueueUser;
import com.que.que.service.QueueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/queue")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/join")
        public QueueResponse joinQueue(@RequestBody JoinRequest request) {

            QueueUser user = queueService.joinQueue(
                    request.getName(),
                    request.getPriority()
            );

            QueueResponse res = new QueueResponse();
            res.setToken(user.getTokenNumber());
            res.setName(user.getName());
            res.setStatus(user.getStatus().toString());
            res.setPosition(queueService.getPosition(user.getTokenNumber()));
            res.setEstimatedWaitTime(res.getPosition() * 5);

            return res;
        }

    @GetMapping("/status/{id}")
        public StatusResponse getStatus(@PathVariable int id) {
            QueueUser user = queueService.getUserById(id);

            StatusResponse res = new StatusResponse();
            res.setToken(id);
            res.setStatus(user.getStatus().toString());
            res.setPosition(queueService.getPosition(id));

            return res;
        }
    
    @GetMapping("/all")
        public List<QueueUser> getAll() {
            return queueService.getAllUsers();
        }
}